// src/pages/Home.jsx

import React from "react";
import './Home.css'
import ProductCard from "../components/ProductCard";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Recycled Chair",
      image:
        "https://images.unsplash.com/photo-1582582425400-279c2988c9e3?auto=format&q=80&fit=crop&w=400",
      price: 1200,
    },
    {
      id: 2,
      name: "Eco Lamp",
      image:
        "https://images.unsplash.com/photo-1583267747160-8e339402b78b?auto=format&q=80&fit=crop&w=400",
      price: 800,
    },
    {
      id: 3,
      name: "Reclaimed Table",
      image:
        "https://images.unsplash.com/photo-1602526432604-29e8ecda01ad?auto=format&q=80&fit=crop&w=400",
      price: 1500,
    },
  ];

  return (
    <div className="home">

      {/* Announcement + Hero */}
      <section className="section hero">
        <div className="container hero-grid">
          <div className="order-2 md:order-1 text-center-md-left">
            <div className="hero-badge">Sustainable Shopping Reinvented</div>
            <h1 className="hero-title">Shop <span className="accent">Recycled</span> ,Support<br className="hidden md:block" /><span className="accent">Sustainability</span></h1>
            <p className="hero-text">Connect with sustainable solutions. Buy products made from recycled materials, contribute recyclables, and join our mission for a greener planet.</p>
            <div className="hero-actions">
              <button>Shop now →</button>
              <a href="#products" className="ghost-btn">Browse catalog</a>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1400&auto=format&fit=crop" alt="Recycled products" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="Contribute"
                className="h-10 mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Contribute Waste
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Give your recyclable items a new life.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1358/1358023.png"
                alt="Recycle"
                className="h-10 mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                We Process
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Our partners recycle them into useful products.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
                alt="Shop"
                className="h-10 mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Buy & Support
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Buy recycled goods and support the cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products section */}
      <section id="products" className="section">
        <div className="container">
          <div className="products-head">
            <h2 className="products-title">Our Products</h2>
            <div className="products-controls">
              <select className="select"><option>All categories</option></select>
              <button className="ghost-btn">View all →</button>
            </div>
          </div>
          <p className="products-sub">Shop our selection of high-quality recycled products <span className="hint">Fresh arrivals weekly</span></p>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta">
        <div className="container">
          <h4 className="cta-title">Ready to Make a Difference?</h4>
          <p className="cta-text">Start your sustainability journey today. Browse eco-friendly products or contribute your recyclable materials.</p>
          <div className="cta-actions">
            <a href="#products" className="btn-outline">Browse products</a>
            <a href="/contribute" className="btn-primary">Contribute now</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center text-sm py-4">
        &copy; 2025 RecycKart. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
