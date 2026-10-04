import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ritik Mishra — GenAI & Agentic AI Developer',
  description: 'A personal portfolio showcasing Generative AI, Agentic AI, RAG, LLM applications, machine learning systems and practical AI engineering projects.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Ritik Mishra — GenAI & Agentic AI Developer',
    description: 'A personal portfolio showcasing Generative AI, Agentic AI, RAG, LLM applications, machine learning systems and practical AI engineering projects.',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'Ritik Mishra — GenAI & Agentic AI Developer',
    description: 'A personal portfolio showcasing Generative AI, Agentic AI, RAG, LLM applications, machine learning systems and practical AI engineering projects.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
