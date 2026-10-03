import type { Project } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectGrid({ projects, featured = false }: { projects: Project[]; featured?: boolean }) {
  return <div className={featured ? 'grid gap-5 lg:grid-cols-12' : 'grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
    {projects.map((project, index) => <div key={project.slug} className={`${featured ? (index === 0 ? 'lg:col-span-12' : index < 3 ? 'lg:col-span-6' : 'lg:col-span-12') : 'h-full'}`}><ProjectCard project={project} priority={featured && index === 0} /></div>)}
  </div>;
}
