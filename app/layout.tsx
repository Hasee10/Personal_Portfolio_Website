import type { Metadata } from 'next'
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
  title: 'Haseeb Arshad — Agentic AI Engineer',
  description: 'AI engineer building voice agents, LLM pipelines, and agentic systems that ship.',
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
