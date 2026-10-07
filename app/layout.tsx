import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ritik-mishra-portfolio.pages.dev'),
  title: 'Ritik Mishra — AI Engineer',
  description: 'Ritik Mishra is an AI Engineer building GenAI & Agentic Systems, RAG applications, LLM workflows, and practical machine learning products.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Ritik Mishra — AI Engineer',
    description: 'GenAI & Agentic Systems, RAG applications, LLM workflows, and practical machine learning products by Ritik Mishra.',
    type: 'website',
    url: '/'
  },
  twitter: {
    card: 'summary',
    title: 'Ritik Mishra — AI Engineer',
    description: 'GenAI & Agentic Systems, RAG applications, LLM workflows, and practical machine learning products by Ritik Mishra.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('portfolio-theme');if(t==='light')document.documentElement.dataset.theme='light'}catch(e){}` }} /></head><body>{children}</body></html>;
}
