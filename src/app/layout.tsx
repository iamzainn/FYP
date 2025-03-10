import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'WEB BUILDER',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log("root layout")
  return (
    
      <html lang="en" suppressHydrationWarning>
        <body className={`antialiased`}>
          {children}
        </body>
      </html>

  )
}