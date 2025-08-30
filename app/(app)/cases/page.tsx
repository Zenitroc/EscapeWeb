import CaseCard from '@/components/CaseCard';

export default function CasesPage() {
  return (
    <main className="p-8 grid gap-4">
      <CaseCard title="Caso de ejemplo" slug="demo" tier="free" />
    </main>
  );
}
