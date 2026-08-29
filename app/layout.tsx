import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MOHAMED FARHAN P // Software Developer',
  description:
    'Futuristic developer command center — portfolio of Mohamed Farhan P. Software Developer specializing in AI, cloud computing, databases and web technologies.',
  generator: 'v0.app',
  keywords: [
    'Mohamed Farhan P',
    'Software Developer',
    'Portfolio',
    'AI',
    'Machine Learning',
    'Cloud Computing',
    'Python',
    'Full Stack',
  ],
  authors: [{ name: 'Mohamed Farhan P' }],
  openGraph: {
    title: 'MOHAMED FARHAN P // Software Developer',
    description:
      'An Iron Man-inspired futuristic developer command center. Building intelligent systems, scalable applications, and futuristic digital experiences.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0806',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${orbitron.variable} ${rajdhani.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
