import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export function createCheckoutSession(priceId: string, customerEmail: string) {
  return stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: customerEmail,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
  });
}

export function createBillingPortal(customerId: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
  });
}
