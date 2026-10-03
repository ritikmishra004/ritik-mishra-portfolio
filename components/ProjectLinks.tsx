import { ArrowUpRight, BookOpen, Play, Terminal } from 'lucide-react';
import type { ProjectLinks as ProjectLinksData } from '@/data/projects';

const resources = [
  { key: 'live', label: 'Try Live', icon: Play },
  { key: 'apiDocs', label: 'API Docs', icon: BookOpen },
  { key: 'video', label: 'Watch Demo', icon: Play },
  { key: 'github', label: 'GitHub', icon: ArrowUpRight },
  { key: 'architecture', label: 'View Architecture', icon: ArrowUpRight },
  { key: 'localRun', label: 'Run Locally', icon: Terminal }
] as const;

export function ProjectLinks({ links, compact = false, liveLabel }: { links: ProjectLinksData; compact?: boolean; liveLabel?: string }) {
  const available = resources.filter(({ key }) => links[key]);
  if (!available.length) return null;
  return <div className={compact ? 'flex flex-wrap gap-x-4 gap-y-2' : 'flex flex-wrap gap-3'}>
    {available.map(({ key, label, icon: Icon }) => <a key={key} href={links[key]!} target="_blank" rel="noreferrer" className={compact ? 'inline-flex items-center gap-1 text-sm text-signal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal' : 'button-secondary'}>
      <Icon size={14} aria-hidden="true" />{key === 'live' && liveLabel ? liveLabel : label}
    </a>)}
  </div>;
}
