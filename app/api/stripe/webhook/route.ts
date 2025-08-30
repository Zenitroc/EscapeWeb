import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseServer } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    await supabaseServer.from('subscriptions').upsert({
      user_id: session.client_reference_id,
      tier: session.metadata.tier,
      stripe_sub: session.subscription
    });
  }
  return NextResponse.json({ received: true });
}
