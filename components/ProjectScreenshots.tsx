import Image from 'next/image';
import type { ProjectScreenshot } from '@/data/projects';

export function ProjectScreenshotPreview({ screenshot }: { screenshot: ProjectScreenshot }) {
  return <figure className="project-screenshot-preview"><Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" loading="lazy" /><figcaption>{screenshot.label}</figcaption></figure>;
}

export function ProjectScreenshotShowcase({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  if (!screenshots.length) return null;
  const [main, ...supporting] = screenshots;
  return <section className="project-screenshot-showcase" aria-label="Application screenshots">
    <figure className="project-screenshot-main"><Image src={main.src} alt={main.alt} fill priority sizes="(max-width: 1024px) 100vw, 70vw" className="object-contain" /><figcaption>{main.label}</figcaption></figure>
    {supporting.length > 0 && <div className="project-screenshot-supporting">{supporting.map((screenshot) => <figure key={screenshot.src}><div><Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover object-top" loading="lazy" /></div><figcaption>{screenshot.label}</figcaption></figure>)}</div>}
  </section>;
}
