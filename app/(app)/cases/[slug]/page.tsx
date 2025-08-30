import { validateSubmission } from '@/lib/actions';

export default function CaseReader({ params }: { params: { slug: string } }) {
  async function submit(formData: FormData) {
    'use server';
    const answer = formData.get('answer') as string;
    return validateSubmission(params.slug, answer);
  }

  return (
    <form action={submit} className="p-8 space-y-4">
      <h1 className="text-xl">Caso {params.slug}</h1>
      <input name="answer" className="border p-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Enviar</button>
    </form>
  );
}
