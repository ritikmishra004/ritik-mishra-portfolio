import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ritik Mishra — GenAI & Agentic AI Developer',
  description: 'Portfolio of practical generative AI, agentic AI, and machine-learning systems by Ritik Mishra.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
