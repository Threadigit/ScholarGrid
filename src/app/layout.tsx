import type { Metadata } from 'next';
import { Inter, Instrument_Serif, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thescholargrid.com'),
  title: {
    default: 'ScholarGrid | Education Intelligence Infrastructure',
    template: '%s | ScholarGrid'
  },
  description: 'ScholarGrid is a predictive education intelligence platform that combines vast historical educational performance data with live student progress to deliver precise real-time success predictions, mastery insights, adaptive learning pathways, and school-level cohort forecasts.',
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
    description: 'ScholarGrid is a predictive education intelligence platform that combines vast historical educational performance data with live student progress to deliver precise real-time success predictions, mastery insights, adaptive learning pathways, and school-level cohort forecasts.',
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
    description: 'ScholarGrid is a predictive education intelligence platform that combines vast historical educational performance data with live student progress to deliver precise real-time success predictions, mastery insights, adaptive learning pathways, and school-level cohort forecasts.',
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
    description: 'ScholarGrid is a predictive education intelligence platform that combines vast historical educational performance data with live student progress to deliver precise real-time success predictions, mastery insights, adaptive learning pathways, and school-level cohort forecasts.',
  };

  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}>
      <body>
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
