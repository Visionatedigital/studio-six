import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: {
    default: 'Studio Six - AI Design Assistant',
    template: '%s | Studio Six'
  },
  description: 'Transform your sketches into stunning architectural renders with AI. Join 10,000+ happy designers and start creating beautiful designs faster than ever before.',
  keywords: ['AI design', 'architectural visualization', '3D rendering', 'AI rendering', 'design assistant', 'architectural design', 'interior design', '3D modeling'],
  authors: [{ name: 'Studio Six' }],
  creator: 'Studio Six',
  publisher: 'Studio Six',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://studiosix.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studiosix.ai',
    siteName: 'Studio Six',
    title: 'Studio Six - AI Design Assistant',
    description: 'Transform your sketches into stunning architectural renders with AI. Join 10,000+ happy designers and start creating beautiful designs faster than ever before.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Six AI Design Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Six - AI Design Assistant',
    description: 'Transform your sketches into stunning architectural renders with AI. Join 10,000+ happy designers and start creating beautiful designs faster than ever before.',
    images: ['/og-image.jpg'],
    creator: '@studiosix',
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
  verification: {
    google: 'your-google-site-verification',
  },
}; 