import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/', 
  '/sign-up(.*)',
  '/sign-in(.*)',
  '/api/uploadthing',
  '/site(.*)'
])

export default clerkMiddleware(async (auth, request) => {
  console.log("middleware")
  const url = request.nextUrl
  const { pathname, searchParams } = url
  const search = searchParams.toString()
  const host = request.headers.get('host')

  console.log("url : "+url);
  console.log("host "+host);
  console.log("search : "+search+"\n");


  

  // Handle subdomain/path routing
  const pathSegments = pathname.split('/').filter(Boolean)
  let subdomain = pathSegments[0]
  if (subdomain=='site'){
    subdomain=''
  }

  console.log("path segments "+pathSegments);
  console.log("subdomain  "+subdomain);


  // Redirect logic
  if (subdomain && !['sign-in', 'sign-up', 'site'].includes(subdomain)) {
    console.log("here i am ");
    const newPath = `/${process.env.NEXT_PUBLIC_DOMAIN}/${subdomain}${pathSegments.slice(1).join('/')}`
    console.log("new path : "+newPath)
    console.log(`${pathSegments.slice(1).join('/')}`)
  }

  // Handle root path
  if (pathname === '/') {
    const newUrl = new URL('/site', url)
    newUrl.search = search
    return NextResponse.rewrite(newUrl)
  }

  // Protect non-public routes
  if (!isPublicRoute(request)) {
    const { userId } =await auth()
    if (!userId) {
      return (await auth()).redirectToSignIn({ returnBackUrl: url.href })
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}