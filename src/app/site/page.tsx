import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, Store, Zap, Sparkles, 
   LayoutGrid, MessagesSquare, ShoppingCart 
} from 'lucide-react'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Build your store with AI-powered simplicity
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create a professional online store in minutes with our intuitive drag-and-drop builder enhanced by AI customization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore templates
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No credit card required • 14-day free trial
              </p>
            </div>
            <div className="relative">
              <div className="rounded-lg shadow-xl overflow-hidden border border-gray-200">
                <Image 
                  src="/images/hero-dashboard.png" 
                  alt="BuildAI dashboard interface"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">AI Assistant</p>
                    <p className="text-sm text-gray-500">Customizing your theme...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands/Trust Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium mb-8">
            TRUSTED BY THOUSANDS OF BUSINESSES WORLDWIDE
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75">
            {/* Replace with actual brand logos */}
            {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5'].map((brand, index) => (
              <div key={index} className="text-gray-400 font-semibold">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to sell online
            </h2>
            <p className="text-xl text-gray-600">
              Powerful tools to build, customize, and grow your online business with ease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <LayoutGrid className="h-6 w-6" />,
                title: 'Drag & Drop Builder',
                description: 'Easily customize your store with intuitive drag-and-drop functionality. No coding required.'
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: 'AI Design Assistant',
                description: 'Get personalized recommendations and style suggestions powered by advanced AI.'
              },
              {
                icon: <Store className="h-6 w-6" />,
                title: 'Responsive Templates',
                description: 'Professional templates optimized for all devices, from desktop to mobile.'
              },
              {
                icon: <ShoppingCart className="h-6 w-6" />,
                title: 'Product Management',
                description: 'Easily upload, organize and showcase your products with powerful tools.'
              },
              {
                icon: <MessagesSquare className="h-6 w-6" />,
                title: 'NLP Chat Interface',
                description: 'Simply describe what you want, and our AI will help implement your vision.'
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: 'Performance Optimized',
                description: 'Fast-loading stores designed to convert visitors into customers.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center text-primary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section Highlight */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image 
                src="/images/ai-chat-interface.png" 
                alt="AI Chat Interface"
                width={600}
                height={450}
                className="rounded-lg shadow-xl border border-gray-200"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Customization
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Describe your vision, we&apos;ll build it
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our advanced NLP chat interface lets you describe what you want in plain language. Ask for style changes, layout adjustments, or completely new sections - our AI handles the implementation.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Natural language store customization",
                  "Real-time style and design suggestions",
                  "AI-generated content recommendations",
                  "Instant implementation of complex changes"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/ai-customization">
                <Button>
                  Learn more about AI features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Build your store in 3 simple steps
            </h2>
            <p className="text-xl text-gray-600">
              From template to finished store in minutes, not days
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Choose a template',
                description: 'Select from dozens of industry-specific templates designed for conversion.'
              },
              {
                number: '02',
                title: 'Customize with AI',
                description: 'Use our AI chat to describe changes or manually edit with our drag-and-drop builder.'
              },
              {
                number: '03',
                title: 'Launch your store',
                description: 'Add your products, connect payment methods, and start selling immediately.'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/sign-up">
              <Button size="lg">
                Get started for free
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by small businesses
            </h2>
            <p className="text-xl text-gray-600">
              See what store owners are saying about BuildAI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "BuildAI helped me launch my boutique clothing store in just one afternoon. The AI suggestions were spot on for my brand.",
                author: "Sarah Johnson",
                business: "Urban Threads Boutique"
              },
              {
                quote: "I was amazed how quickly I could create a professional store. The AI chat feature saved me countless hours of figuring things out.",
                author: "Michael Rodriguez",
                business: "Craft Coffee Roasters"
              },
              {
                quote: "As someone with zero technical skills, BuildAI was a game-changer. I described what I wanted, and the AI implemented it perfectly.",
                author: "Emily Chen",
                business: "Wellness Essentials Co."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to build your online store?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of small businesses using BuildAI to create beautiful, high-converting online stores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start free trial
              </Button>
            </Link>
            <Link href="/contact-sales">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-primary-700 w-full sm:w-auto">
                Contact sales
              </Button>
            </Link>
          </div>
          <p className="text-sm text-primary-100 mt-4">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home