import Link from 'next/link';

interface MemberDetail {
  id: string;
  name: string;
  role: string | null;
  skills: { name: string }[];
}

async function getMember(id: string): Promise<MemberDetail | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getMember(id);

  if (!member) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-zinc-500">Member not found.</p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/team"
        className="text-sm text-zinc-500 hover:text-foreground mb-8 inline-block transition-colors"
      >
        ← Team
      </Link>

      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl font-semibold text-zinc-600 dark:text-zinc-300">
          {member.name[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{member.name}</h1>
          <p className="text-zinc-500 dark:text-zinc-400">{member.role ?? 'No role'}</p>
        </div>
      </div>

      <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-4">
        Skills ({member.skills.length})
      </p>

      {member.skills.length === 0 ? (
        <p className="text-zinc-400">No skills listed.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {member.skills.map((s) => (
            <span
              key={s.name}
              className="rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-sm text-foreground"
            >
              {s.name}
            </span>
          ))}
        </div>
      )}
    </main>
  );
}
