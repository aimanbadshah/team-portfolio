import Link from 'next/link';

interface SkillMember {
  id: string;
  name: string;
}

interface Skill {
  id: string;
  name: string;
  members: SkillMember[];
}

async function getSkills(): Promise<Skill[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Skills</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">
        {skills.length} skill{skills.length !== 1 ? 's' : ''} across the team
      </p>

      {skills.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-10 text-center text-zinc-400">
          No skills yet.
        </div>
      ) : (
        <div className="space-y-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-5 py-4 flex items-center gap-6"
            >
              <p className="w-40 shrink-0 font-medium text-foreground">{skill.name}</p>

              <div className="flex flex-wrap gap-2">
                {skill.members.map((m) => (
                  <Link
                    key={m.id}
                    href={`/team/${m.id}`}
                    className="rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-sm text-foreground hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
                  >
                    {m.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
