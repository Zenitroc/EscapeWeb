import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/db';
import { randomBytes } from 'crypto';

export async function POST(req: Request) {
  const { name } = await req.json();
  const code = randomBytes(3).toString('hex');
  const { data } = await supabaseServer
    .from('teams')
    .insert({ name, join_code: code })
    .select('id, join_code')
    .single();
  return NextResponse.json(data);
}
