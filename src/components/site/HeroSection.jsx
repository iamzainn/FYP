export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Digital Presence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create stunning experiences with our platform that grows with your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg">
              Get Started
            </button>
            <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors text-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 