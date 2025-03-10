export default function Features() {
  const features = [
    {
      title: "Lightning Fast",
      description: "Optimized performance for seamless user experiences",
      icon: "⚡"
    },
    {
      title: "Secure Platform",
      description: "Enterprise-grade security for your peace of mind",
      icon: "🔒"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance whenever you need it",
      icon: "🛎️"
    }
  ]

  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Experience the difference with our cutting-edge platform</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 