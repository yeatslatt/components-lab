import type { Metadata } from 'next'
import './globals.css'
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: 'Procstudio IA',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <p>teste</p>
      </body>
    </html>
  )
}
