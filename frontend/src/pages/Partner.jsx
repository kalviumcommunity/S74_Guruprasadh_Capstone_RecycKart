import React from "react";

export default function Partner() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with RecycKart logo */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-600 rounded-sm flex items-center justify-center mr-2 shadow-sm">
              <span className="text-white text-xs font-bold">♻</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">RecycKart</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Title Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Partner With RecycKart
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Join our growing network of partners and help us transform the way people buy eco-friendly products — together, we build a greener future.
          </p>
        </section>

        {/* How the Partnership Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">How the Partnership Works</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Here’s how the process of becoming a RecycKart manufacturing partner unfolds:
          </p>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Application",
                desc: "Submit your application with information about your company and products. Our team reviews all applications to ensure alignment with our sustainability goals.",
              },
              {
                step: "2",
                title: "Verification",
                desc: "We schedule a meeting to learn more about your production process, sustainability practices, and verify the recycled content of your products.",
              },
              {
                step: "3",
                title: "Onboarding",
                desc: "Once approved, we'll help you set up your store on RecycKart and guide you through our platform's features and tools for managing your products.",
              },
              {
                step: "4",
                title: "Growth & Support",
                desc: "Benefit from our marketing initiatives, dedicated support team, and opportunities to connect with material suppliers and other eco-conscious businesses.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-5 mt-1 flex-shrink-0 shadow-md">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-base">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Become a Partner Form */}
        <section className="glass-card bg-white/70 backdrop-blur-sm p-10 rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Become a Partner</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Fill out this form and our team will review your application within 3–5 business days.
          </p>

          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                  placeholder="e.g., EcoManufacture Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Location *</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                placeholder="City, State, Country"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method *</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white">
                  <option>Email</option>
                  <option>Phone</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                  placeholder="Enter email or phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Type *</label>
              <textarea
                rows="4"
                placeholder="Please specify what kind of recycled products you manufacture (e.g., bags, containers, apparel)"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
              <textarea
                rows="5"
                placeholder="Tell us about your sustainability certifications, production capacity, or anything else we should know."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="required"
                className="mt-2 mr-3 h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="required" className="text-sm text-gray-600 pt-1">
                I confirm that all information provided is accurate and I agree to RecycKart’s Partner Terms.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-medium text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit Application
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-green-600 rounded-sm flex items-center justify-center mr-2 shadow-sm">
                  <span className="text-white text-xs font-bold">♻</span>
                </div>
                <span className="font-semibold text-lg tracking-tight">RecycKart</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                Connecting buyers with eco-conscious brands to foster a circular, sustainable economy.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-green-600 cursor-pointer transition-colors">All Products</li>
                <li className="hover:text-green-600 cursor-pointer transition-colors">Best Sellers</li>
                <li className="hover:text-green-600 cursor-pointer transition-colors">Clothing</li>
                <li className="hover:text-green-600 cursor-pointer transition-colors">Kitchen</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-green-600 cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-green-600 cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-green-600 cursor-pointer transition-colors">Return Policy</li>
                <li className="hover:text-green-600 cursor-pointer transition-colors">Size Guide</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-green-600 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-green-600 cursor-pointer transition-colors">Press</li>
                <li className="hover:text-green-600 cursor-pointer transition-colors">Our Sustainability Promise</li>
                <li className="hover:text-green-600 cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} RecycKart. All rights reserved. Crafted with ♻ for a greener planet.
          </div>
        </div>
      </footer>

      {/* Global Styles for Glass Cards */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(229, 231, 235, 0.6);
        }
      `}</style>
    </div>
  );
}