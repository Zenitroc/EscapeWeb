import { supabaseServer } from './db';

export async function validateSubmission(slug: string, answer: string) {
  const { data } = await supabaseServer
    .from('puzzles')
    .select('solution_regex')
    .eq('slug', slug)
    .single();
  const regex = new RegExp(data.solution_regex, 'i');
  return { correct: regex.test(answer.trim()) };
}
