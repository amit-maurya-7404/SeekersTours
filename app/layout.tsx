import type { Metadata } from 'next'
import { Geist, Geist_Mono, Cinzel, Syne, Bebas_Neue, Unbounded, Righteous, Krona_One, Shrikhand, Luckiest_Guy, Dela_Gothic_One } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const cinzel = Cinzel({ 
  subsets: ["latin"], 
  weight: ["700", "800"],
  variable: '--font-logo-cinzel'
});

const syne = Syne({ 
  subsets: ["latin"], 
  weight: ["700", "800"],
  variable: '--font-logo-syne'
});

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-logo-bebas'
});

const unbounded = Unbounded({ 
  subsets: ["latin"], 
  weight: ["700", "800"],
  variable: '--font-logo-unbounded'
});

const righteous = Righteous({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-logo-righteous'
});

const kronaOne = Krona_One({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-logo-krona'
});

const shrikhand = Shrikhand({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-logo-shrikhand'
});

const luckiestGuy = Luckiest_Guy({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-logo-luckiest'
});

const delaGothicOne = Dela_Gothic_One({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-logo-dela'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.seekerstours.in'),
  title: 'Seekers Tours - Premium Adventure Travel',
  description: 'Discover unforgettable journeys with Seekers Tours. Expert-guided adventure travel experiences to exotic destinations.',
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '4cY5tsr4YyZpMkzBMj8UL5eydKy5lgpyoZygz5v3X-w',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Seekers Tours - Premium Adventure Travel',
    description: 'Discover unforgettable journeys with Seekers Tours. Expert-guided adventure travel experiences to exotic destinations.',
    url: 'https://www.seekerstours.in',
    siteName: 'Seekers Tours',
    images: [
      {
        url: '/images/LOGO.jpeg',
        width: 1200,
        height: 630,
        alt: 'Seekers Tours Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seekers Tours - Premium Adventure Travel',
    description: 'Discover unforgettable journeys with Seekers Tours. Expert-guided adventure travel experiences to exotic destinations.',
    images: ['/images/LOGO.jpeg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <body className={`font-sans antialiased text-foreground ${cinzel.variable} ${syne.variable} ${bebasNeue.variable} ${unbounded.variable} ${righteous.variable} ${kronaOne.variable} ${shrikhand.variable} ${luckiestGuy.variable} ${delaGothicOne.variable}`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
