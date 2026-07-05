import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Background from '@/components/Background'

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mlengineer.vercel.app'),
  title: 'Haseeb Arshad — Agentic AI Engineer',
  description:
    'AI engineer building voice agents, LLM pipelines, and agentic systems that ship. Production voice AI, RAG systems, and multi-agent orchestration.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Haseeb Arshad — Agentic AI Engineer',
    description:
      'AI engineer building voice agents, LLM pipelines, and agentic systems that ship.',
    url: 'https://mlengineer.vercel.app',
    siteName: 'Haseeb Arshad',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Haseeb Arshad — Agentic AI Engineer',
    description:
      'AI engineer building voice agents, LLM pipelines, and agentic systems that ship.',
  },
}

export const viewport: Viewport = {
  themeColor: '#090B08',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* bg-bg removed — html element handles base colour, Background component layers above it */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-text font-sans antialiased`}
      >
        <Background />
        {children}
      </body>
    </html>
  )
}
