import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { ProjectLinks } from './ProjectLinks';
import { TechStack } from './TechStack';
import { ProjectVisual } from './SystemVisual';
import { ProjectScreenshotPreview } from './ProjectScreenshots';

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const isCodingAgent = project.slug === 'ai-coding-agent';
  const teaserScreenshots = isCodingAgent && project.screenshots
    ? [
        project.screenshots.find((s) => s.src.endsWith('01-login.png')),
        project.screenshots.find((s) => s.src.endsWith('02-local-agent-vscode.png')),
        project.screenshots.find((s) => s.src.endsWith('03-workspace-selection.png'))
      ].filter((s): s is NonNullable<typeof s> => Boolean(s))
    : [];

  return <article className={`group relative flex ${project.category === 'Machine Learning' ? 'h-full' : ''} flex-col rounded-2xl border border-line bg-panel p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-[#424850] ${priority ? 'md:min-h-[31rem] md:p-8' : project.featured ? 'md:min-h-[27rem]' : 'min-h-[18rem]'}`}>
    <div className="mb-8 flex items-center justify-between text-xs font-medium uppercase tracking-[.16em] text-muted"><span>{project.eyebrow}</span><span className="text-signal">{project.category}</span></div>
    <h3 className="font-display text-2xl font-medium tracking-tight text-white">{project.title}</h3>
    <p className="mt-3 max-w-md text-sm leading-6 text-muted">{project.summary}</p>
    {project.featured && <div className="mt-6 space-y-3">
      <ProjectVisual project={project} />
      {project.slug !== 'ai-coding-agent' && project.screenshots?.[0] && <ProjectScreenshotPreview screenshot={project.screenshots[0]} />}
      {isCodingAgent && teaserScreenshots.length > 0 && (
        <div className="pt-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[.18em] text-signal">
              PROJECT SCREENSHOTS
            </span>
            <Link
              href={`/projects/${project.slug}#screenshots`}
              className="group/link inline-flex items-center gap-1 text-[11px] text-muted transition hover:text-white"
              aria-label="View all 7 project screenshots in case study"
            >
              <span>7 screenshots</span>
              <span aria-hidden="true" className="text-signal transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {teaserScreenshots.map((item) => (
              <Link
                key={item.src}
                href={`/projects/${project.slug}#screenshots`}
                className="group/thumb relative block aspect-[16/10] overflow-hidden rounded-md border border-line bg-ink/70 transition duration-200 hover:border-signal/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal"
                aria-label={`${item.label} screenshot — View in case study`}
                title={`${item.label} — Open in Case Study`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 30vw, (max-width: 1024px) 25vw, 180px"
                  className="object-cover object-top opacity-85 transition duration-300 group-hover/thumb:opacity-100 group-hover/thumb:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-1">
                  <p className="truncate text-[9px] uppercase tracking-wider text-muted group-hover/thumb:text-white">
                    {item.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>}
    <div className="mt-5"><TechStack items={project.stack} /></div>
    <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
      <ProjectLinks links={project.links} compact hiddenKeys={project.slug === 'ai-coding-agent' ? ['live', 'apiDocs'] : []} />
      <Link href={`/projects/${project.slug}`} className="button-secondary"><ArrowUpRight size={14} />Case Study</Link>
    </div>
  </article>;
}
