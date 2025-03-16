//site/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'
// import { SiteNav } from '@/components/site/SiteNav'
const SiteLayout = ({children}:{children:React.ReactNode}) => {
  console.log("site layout")
  return (
    
    <ClerkProvider appearance={{baseTheme:dark}}>
      <div className="flex flex-col min-h-screen">
        {/* <SiteNav /> */}
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </ClerkProvider>
   
  )
}


function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default SiteLayout