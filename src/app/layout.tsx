import type { Metadata } from 'next'
import './globals.css'
import { Inter, Roboto, Poppins, Playfair_Display, Montserrat, Open_Sans, Source_Code_Pro } from 'next/font/google'

// Configure the fonts
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '700'],
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '700'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '700'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '700'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
  weight: ['400', '500', '700'],
})

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sourcecode',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'WEB BUILDER',
  description: '',
  // Add font metadata here for better SEO
  // This is optional but recommended
  openGraph: {
    title: 'WEB BUILDER',
    description: '',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en" suppressHydrationWarning className={`
      ${inter.variable} 
      ${roboto.variable} 
      ${poppins.variable} 
      ${playfairDisplay.variable} 
      ${montserrat.variable} 
      ${openSans.variable} 
      ${sourceCodePro.variable}
    `}>
      <head>
        {/* Add Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat:wght@400;500;700&family=Open+Sans:wght@400;500;700&family=Playfair+Display:wght@400;500;700&family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&family=Source+Code+Pro:wght@400;500;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  )
}