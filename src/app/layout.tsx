import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ScholarGrid | Education Intelligence Infrastructure',
    template: '%s | ScholarGrid'
  },
  description: 'ScholarGrid is a predictive engine that models mastery and forecasts educational outcomes. Discover real-time benchmarking, adaptive pathways, and institutional intelligence.',
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
    url: 'https://scholargrid.com',
    title: 'ScholarGrid | Education Intelligence Infrastructure',
    description: 'A predictive engine that models mastery and forecasts educational outcomes. Real-time benchmarking and adaptive pathways.',
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
    description: 'A predictive engine that models mastery and forecasts educational outcomes.',
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
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
