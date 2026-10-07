import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const productionUrl = 'https://ritik-mishra-portfolio.pages.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: productionUrl, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({
      url: `${productionUrl}/projects/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.9 : 0.7
    }))
  ];
}
