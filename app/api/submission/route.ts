import { NextResponse } from 'next/server';
import { validateSubmission } from '@/lib/actions';

export async function POST(req: Request) {
  const { slug, answer } = await req.json();
  const result = await validateSubmission(slug, answer);
  return NextResponse.json(result);
}
