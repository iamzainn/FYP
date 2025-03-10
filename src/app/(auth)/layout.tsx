//    /app/(auth)/layout.tsx

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'


const MainLayout = ({children}:{children:React.ReactNode}) => {
    console.log("AUTH layout");
  return (
       

    <ClerkProvider appearance={{baseTheme:dark}}>
        {children}
    </ClerkProvider>
    
  )
}

export default MainLayout