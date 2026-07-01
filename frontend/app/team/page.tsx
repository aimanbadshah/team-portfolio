interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  skillCount: number;
}

async function getTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Team</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">
        {members.length} member{members.length !== 1 ? 's' : ''}
      </p>

      {members.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-10 text-center text-zinc-400">
          No team members yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <a
              key={member.id}
              href={`/team/${member.id}`}
              className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-base font-semibold text-zinc-600 dark:text-zinc-300">
                  {member.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-foreground group-hover:underline">{member.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{member.role ?? 'No role'}</p>
                </div>
              </div>
              <div className="text-xs text-zinc-400 dark:text-zinc-500">
                {member.skillCount} skill{member.skillCount !== 1 ? 's' : ''}
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
