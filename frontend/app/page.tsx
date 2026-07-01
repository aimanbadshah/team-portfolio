import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-4">AI Automation Team Portfolio</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm mx-auto">
          Skills and projects overview for the team.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/team"
            className="rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:opacity-80 transition-opacity"
          >
            View Team
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-zinc-300 dark:border-zinc-700 px-6 py-2.5 text-sm font-medium text-foreground hover:border-zinc-500 dark:hover:border-zinc-500 transition-colors"
          >
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
