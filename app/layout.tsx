import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GROVE — Sharp minds. Real talk. Brotherhood.',
  description: 'A premium men\'s lifestyle, dating intelligence, and community platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
