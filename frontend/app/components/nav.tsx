import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-foreground">
          AI Automation Team Portfolio
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/team" className="text-zinc-500 hover:text-foreground transition-colors">
            Team
          </Link>
          <Link href="/skills" className="text-zinc-500 hover:text-foreground transition-colors">
            Skills
          </Link>
          <Link href="/projects" className="text-zinc-500 hover:text-foreground transition-colors">
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
}
