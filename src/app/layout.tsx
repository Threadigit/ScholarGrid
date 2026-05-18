import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://thescholargrid.com'),
  title: {
    default: 'ScholarGrid | Education Intelligence Infrastructure',
    template: '%s | ScholarGrid'
  },
  description: 'ScholarGrid is the predictive infrastructure layer under education. By mapping live student performance against millions of historical outcomes, we provide precise pathways to improve.',
  keywords: [
    'EdTech', 
    'Education Intelligence', 
    'Predictive Analytics', 
    'Student Outcomes', 
    'Curriculum Gap Analysis', 
    'Mastery Modeling', 
    'Education API', 
    'Adaptive Learning',
    'Institutional Data'
  ],
  authors: [{ name: 'ScholarGrid Inc.' }],
  creator: 'ScholarGrid',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thescholargrid.com',
    title: 'ScholarGrid | Education Intelligence Infrastructure',
    description: 'ScholarGrid is the predictive infrastructure layer under education. By mapping live student performance against millions of historical outcomes, we provide precise pathways to improve.',
    siteName: 'ScholarGrid',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ScholarGrid - Education Intelligence Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScholarGrid | Education Intelligence Infrastructure',
    description: 'ScholarGrid is the predictive infrastructure layer under education. We map live student performance to provide precise pathways to improve.',
    creator: '@ScholarGrid',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ScholarGrid',
    url: 'https://thescholargrid.com',
    logo: 'https://thescholargrid.com/icon.svg',
    description: 'ScholarGrid is the predictive infrastructure layer under education. By mapping live student performance against millions of historical outcomes, we provide precise pathways to improve.',
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
