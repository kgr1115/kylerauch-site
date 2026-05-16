import type { Metadata } from 'next';
import { Newsreader, Hanken_Grotesk } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kyle Rauch — AI-tooling builder & SaaS operator',
  description:
    'Personal site for Kyle Rauch. L2 SaaS escalation operator and AI-tooling builder. Projects include OfferPilotV2, Support Triage, CSM Account Pulse, Diamond Edge.',
  keywords: [
    'Kyle Rauch',
    'AI tooling',
    'CSM',
    'Customer Success',
    'Implementation',
    'Solutions Engineer',
    'AI Trainer',
    'SaaS',
  ],
  authors: [{ name: 'Kyle Rauch' }],
  creator: 'Kyle Rauch',
  metadataBase: new URL('https://kylerauch.com'),
  openGraph: {
    title: 'Kyle Rauch — AI-tooling builder & SaaS operator',
    description:
      'L2 SaaS escalation operator and AI-tooling builder. CSM / Implementation / SE / AI Trainer.',
    url: 'https://kylerauch.com',
    siteName: 'kylerauch.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyle Rauch — AI-tooling builder & SaaS operator',
    description:
      'L2 SaaS escalation operator and AI-tooling builder. CSM / Implementation / SE / AI Trainer.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable}`}
    >
      <body className="bg-background text-on-background font-sans antialiased flex flex-col min-h-screen">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
