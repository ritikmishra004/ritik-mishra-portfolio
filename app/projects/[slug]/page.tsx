import { notFound } from 'next/navigation';
import { AlertTriangle, Box, CheckCircle2 } from 'lucide-react';
import { getProject, projects } from '@/data/projects';
import { Navbar } from '@/components/Navbar';
import { ProjectHero } from '@/components/ProjectHero';
import { ProjectLinks } from '@/components/ProjectLinks';
import { CaseStudy } from '@/components/CaseStudy';
import { ProjectVisual } from '@/components/SystemVisual';
import { ProjectScreenshotShowcase } from '@/components/ProjectScreenshots';
import type { Metadata } from 'next';

export function generateStaticParams() { return [...projects.map(({ slug }) => ({ slug })), { slug: 'rag-chatbot' }]; }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return { title: `${project.title} — Ritik Mishra`, description: project.summary, openGraph: { title: `${project.title} — Ritik Mishra`, description: project.summary, type: 'article' }, twitter: { card: 'summary', title: `${project.title} — Ritik Mishra`, description: project.summary } };
}
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug); if (!project) notFound();
  return <main><Navbar /><div className="shell"><ProjectHero project={project} />
    <div className={`py-10 ${project.category === 'Machine Learning' ? 'project-detail--compact' : ''}`}>{project.screenshots && <ProjectScreenshotShowcase screenshots={project.screenshots} />}{(project.featured || project.slug === 'car-price-prediction') && <div className="mt-8 max-w-4xl"><ProjectVisual project={project} /></div>}{project.metrics.length > 0 && <div className="mt-5 grid max-w-4xl gap-3 sm:grid-cols-3">{project.metrics.map((metric) => <div key={metric.label} className="rounded-lg border border-line bg-panel p-4"><strong className="font-display text-2xl text-white">{metric.value}</strong><p className="mt-1 text-xs text-muted">{metric.label}</p></div>)}</div>}<div className="mt-8"><ProjectLinks links={project.links} hiddenKeys={project.slug === 'ai-coding-agent' ? ['live', 'apiDocs'] : []} /></div>
      {project.executionNote && <aside className="mt-10 flex gap-4 rounded-xl border border-signal/30 bg-signal/[.06] p-5" aria-label="Execution note"><AlertTriangle className="mt-0.5 shrink-0 text-signal" size={19} /><p className="theme-detail-text text-sm leading-6">{project.executionNote}</p></aside>}
      {project.problem && <CaseStudy label="Problem"><p>{project.problem}</p></CaseStudy>}
      {project.solution && <CaseStudy label="Approach"><p>{project.solution}</p></CaseStudy>}
      <CaseStudy label="Architecture"><div className="grid gap-3 sm:grid-cols-2">{project.architecture.map((part, index) => <div key={part} className="theme-detail-text flex items-center gap-3 rounded-lg border border-line bg-panel px-4 py-4 text-sm"><Box size={16} className="text-signal" /><span className="text-muted">{String(index + 1).padStart(2, '0')}</span>{part}</div>)}</div></CaseStudy>
      {project.features.length > 0 && <CaseStudy label="Capabilities"><ul className="grid gap-3 sm:grid-cols-2">{project.features.map((feature) => <li key={feature} className="theme-detail-text rounded-lg border border-line bg-panel px-4 py-3 text-sm">{feature}</li>)}</ul></CaseStudy>}
      {project.caseStudy.map((section) => <CaseStudy key={section.label} label={section.label}><p>{section.content}</p></CaseStudy>)}
      {project.outcome && <CaseStudy label="Outcome"><p className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-signal" size={17} />{project.outcome}</p></CaseStudy>}
    </div></div></main>;
}
