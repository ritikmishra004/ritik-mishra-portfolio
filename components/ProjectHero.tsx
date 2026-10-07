import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import { TechStack } from './TechStack';

export function ProjectHero({ project }: { project: Project }) {
  return <header className="border-b border-line pb-12 pt-12 md:pt-20">
    <Link href="/#work" className="mb-12 inline-flex items-center gap-1 text-sm text-muted hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal"><ChevronLeft size={16} />All work</Link>
    <p className="eyebrow">{project.category} / {project.eyebrow}</p>
    <h1 className="mt-5 max-w-3xl font-display text-5xl font-medium tracking-[-.05em] text-white md:text-7xl">{project.title}</h1>
    <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{project.summary}</p>
    <div className="mt-8"><TechStack items={project.stack} /></div>
  </header>;
}
