import Link from 'next/link';

interface ProjectDetail {
  id: string;
  name: string;
  description: string | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  techStack: string[];
  members: string[];
  createdAt: string;
}

const statusColor: Record<string, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  completed: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  'on-hold': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

function statusClass(status: string) {
  return statusColor[status.toLowerCase()] ?? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400';
}

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

async function getProject(id: string): Promise<ProjectDetail | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-zinc-500">Project not found.</p>
      </main>
    );
  }

  const start = formatDate(project.startDate);
  const end = formatDate(project.endDate);

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/projects"
        className="text-sm text-zinc-500 hover:text-foreground mb-8 inline-block transition-colors"
      >
        ← Projects
      </Link>

      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-foreground">{project.name}</h1>
        <span className={`shrink-0 text-xs font-medium rounded-full px-2.5 py-1 ${statusClass(project.status)}`}>
          {project.status}
        </span>
      </div>

      {project.description && (
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">{project.description}</p>
      )}

      <div className="space-y-6">
        {(start || end) && (
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Timeline</p>
            <p className="text-sm text-foreground">
              {start ?? '—'} → {end ?? 'ongoing'}
            </p>
          </div>
        )}

        {project.techStack.length > 0 && (
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.members.length > 0 && (
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3">
              Team ({project.members.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {project.members.map((memberId) => (
                <Link
                  key={memberId}
                  href={`/team/${memberId}`}
                  className="rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-sm text-foreground hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
                >
                  {memberId}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
