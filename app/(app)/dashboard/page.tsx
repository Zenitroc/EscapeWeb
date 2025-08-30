import { getSession } from '@/lib/db';

export default async function DashboardPage() {
  const session = await getSession();
  return (
    <main className="p-8">
      <h1 className="text-2xl">Dashboard</h1>
      <p>Tier: {session?.user?.tier ?? 'free'}</p>
    </main>
  );
}
