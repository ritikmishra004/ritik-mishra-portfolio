import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://ritik-mishra-portfolio.pages.dev';

const SITE_TITLE = 'Ritik Mishra — AI Engineer';

const SITE_DESCRIPTION =
  'Ritik Mishra is an AI Engineer building GenAI & Agentic Systems, RAG applications, LLM workflows, and practical machine learning products.';

const OG_IMAGE = '/og-image.png';

export const metadata: Metadata = {
  // Website URL
  metadataBase: new URL(SITE_URL),

  // Basic SEO
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: 'Ritik Mishra Portfolio',

  authors: [{ name: 'Ritik Mishra' }],
  creator: 'Ritik Mishra',
  publisher: 'Ritik Mishra',

  // Canonical URL
  alternates: {
    canonical: '/',
  },

  // Search engine indexing
  robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
},

  // Favicon
  icons: {
    icon: '/favicon.svg',
  },

  // Open Graph: LinkedIn and other social previews
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Ritik Mishra Portfolio',
    title: SITE_TITLE,
    description:
      'GenAI & Agentic Systems, RAG applications, LLM workflows, and practical machine learning products by Ritik Mishra.',
    locale: 'en_US',

    images: [
      {
        url: OG_IMAGE,
        width: 2048,
        height: 1046,
        alt: 'Ritik Mishra — AI Engineer Portfolio',
      },
    ],
  },

  // Twitter / X preview
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description:
      'GenAI & Agentic Systems, RAG applications, LLM workflows, and practical machine learning products by Ritik Mishra.',
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        {/* Apply the saved theme before the page renders */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('portfolio-theme');

                if (theme === 'light') {
                  document.documentElement.dataset.theme = 'light';
                }
              } catch (error) {}
            `,
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}