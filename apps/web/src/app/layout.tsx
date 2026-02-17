import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';

const metadataBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: 'Kurtik Appadoo - Portfolio',
  description: 'Kurtik Appadoo portfolio with projects, experience, and contact.',
  icons: {
    icon: '/logos/ka-logo-final.svg',
    shortcut: '/logos/ka-logo-final.svg',
    apple: '/logos/ka-logo-final.svg',
  },
  openGraph: {
    images: ['/logos/ka-logo-final.svg'],
  },
  twitter: {
    images: ['/logos/ka-logo-final.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
