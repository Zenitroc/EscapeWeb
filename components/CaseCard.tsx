import Link from 'next/link';

export default function CaseCard({
  title,
  slug,
  tier
}: {
  title: string;
  slug: string;
  tier: string;
}) {
  return (
    <Link
      href={`/cases/${slug}`}
      className="border p-4 rounded block hover:bg-gray-50"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">Tier: {tier}</p>
    </Link>
  );
}
