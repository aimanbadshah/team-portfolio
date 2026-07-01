import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  techStack: string[];
}

const statusColor: Record<string, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  completed: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  'on-hold': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

function statusClass(status: string) {
  return statusColor[status.toLowerCase()] ?? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400';
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Projects</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">
        {projects.length} project{projects.length !== 1 ? 's' : ''}
      </p>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-10 text-center text-zinc-400">
          No projects yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="font-medium text-foreground group-hover:underline">{project.name}</p>
                <span className={`shrink-0 text-xs font-medium rounded-full px-2 py-0.5 ${statusClass(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {project.description && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">
                  {project.description}
                </p>
              )}

              {project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-zinc-600 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-xs text-zinc-400">+{project.techStack.length - 4} more</span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
