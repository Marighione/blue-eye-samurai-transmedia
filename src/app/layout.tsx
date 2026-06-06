import type { Metadata } from 'next';
import { Cinzel, EB_Garamond, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { UserStateProvider } from '@/context/UserStateContext';
import { Navigation } from '@/components/ui/Navigation';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `Archivo — ${SITE_NAME} | Universo Transmedia`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `Archivo — Blue Eye Samurai`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cinzel.variable} ${ebGaramond.variable} ${cormorantGaramond.variable}`}>
      <body className="antialiased bg-night text-snow min-h-screen">
        <UserStateProvider>
          <Navigation />
          <main>{children}</main>
        </UserStateProvider>
      </body>
    </html>
  );
}
