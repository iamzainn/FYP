'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const UserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { ssr: false }
);

const SignedIn = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignedIn),
  { ssr: false }
);

const SignedOut = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignedOut),
  { ssr: false }
);

export function SiteNav() {
  const pathname = usePathname();
  const navItems = [
    { href: '/site', label: 'Home' },
    { href: '/site/about', label: 'About' },
    { href: '/site/pricing', label: 'Pricing' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link 
            href="/site" 
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold text-indigo-600">YourBrand</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-gray-600 hover:text-indigo-600 transition-colors',
                  pathname === item.href ? 'text-indigo-700 font-semibold' : 'text-gray-600'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton
                afterSignOutUrl="/site"
                appearance={{
                  elements: {
                    avatarBox: 'h-9 w-9',
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({ size: 'sm' })}
              >
                Get Started
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
} 