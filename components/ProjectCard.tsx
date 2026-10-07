import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { ProjectLinks } from './ProjectLinks';
import { TechStack } from './TechStack';
import { ProjectVisual } from './SystemVisual';
import { ProjectScreenshotPreview } from './ProjectScreenshots';

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return <article className={`group relative flex ${project.category === 'Machine Learning' ? 'h-full' : ''} flex-col rounded-2xl border border-line bg-panel p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-[#424850] ${priority ? 'md:min-h-[31rem] md:p-8' : project.featured ? 'md:min-h-[27rem]' : 'min-h-[18rem]'}`}>
    <div className="mb-8 flex items-center justify-between text-xs font-medium uppercase tracking-[.16em] text-muted"><span>{project.eyebrow}</span><span className="text-signal">{project.category}</span></div>
    <h3 className="font-display text-2xl font-medium tracking-tight text-white">{project.title}</h3>
    <p className="mt-3 max-w-md text-sm leading-6 text-muted">{project.summary}</p>
    {project.featured && <div className="mt-6 space-y-3"><ProjectVisual project={project} />{project.screenshots?.[0] && <ProjectScreenshotPreview screenshot={project.screenshots[0]} />}</div>}
    <div className="mt-5"><TechStack items={project.stack} /></div>
    <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
      <ProjectLinks links={project.links} compact hiddenKeys={project.slug === 'ai-coding-agent' ? ['live', 'apiDocs'] : []} />
      <Link href={`/projects/${project.slug}`} className="button-secondary"><ArrowUpRight size={14} />Case Study</Link>
    </div>
  </article>;
}
