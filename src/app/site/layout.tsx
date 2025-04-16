//site/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import { SiteNav } from '@/components/site/SiteNav'

export const metadata: Metadata = {
  title: 'BuildAI - AI-Powered Website Builder for E-commerce',
  description: 'Create customizable, responsive online stores with AI assistance. The smartest way for small businesses to build their online presence.',
  keywords: 'website builder, e-commerce, AI, small business, online store',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buildai.com',
    title: 'BuildAI - AI-Powered Website Builder for E-commerce',
    description: 'Create customizable, responsive online stores with AI assistance. The smartest way for small businesses to build their online presence.',
    siteName: 'BuildAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildAI - AI-Powered Website Builder for E-commerce',
    description: 'Create customizable, responsive online stores with AI assistance. The smartest way for small businesses to build their online presence.',
  }
}

const SiteLayout = ({children}:{children:React.ReactNode}) => {
  
  return (
    
    <ClerkProvider appearance={{baseTheme:dark}}>
      <div className="flex flex-col min-h-screen">
        {/* <SiteNav /> */}
        <SiteNav />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </ClerkProvider>
   
  )
}

function SiteNav() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">BuildAI</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <Link href="/features" className="text-gray-700 hover:text-primary transition">Features</Link>
            <Link href="/templates" className="text-gray-700 hover:text-primary transition">Templates</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary transition">Pricing</Link>
            <Link href="/resources" className="text-gray-700 hover:text-primary transition">Resources</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Start free trial</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BuildAI</h3>
            <p className="text-gray-400 text-sm">
              AI-powered website builder for small businesses around the world. Create your online store in minutes.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
              <li><Link href="/templates" className="hover:text-white transition">Templates</Link></li>
              <li><Link href="/ai-customization" className="hover:text-white transition">AI Customization</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/help-center" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/developers" className="hover:text-white transition">Developers</Link></li>
              <li><Link href="/partners" className="hover:text-white transition">Partner Program</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/legal" className="hover:text-white transition">Legal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} BuildAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default SiteLayout