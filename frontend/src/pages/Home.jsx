import React, { useState, useEffect } from "react";
import { ShoppingBag, Leaf, Recycle, ArrowRight, Package, TrendingUp, Users, Loader2 } from "lucide-react";
import api from "../utils/api";

const ProductCard = ({ product, onAddToCart }) => {
  // Construct the full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&q=80&fit=crop&w=400';
    if (imagePath.startsWith('http')) return imagePath;
    // Use the same base URL as the API but remove '/api' from the end if present
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const cleanBaseUrl = baseUrl.endsWith('/api') ? baseUrl.slice(0, -4) : baseUrl;
    return `${cleanBaseUrl}${imagePath}`;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={getImageUrl(product.image)} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&q=80&fit=crop&w=400';
          }}
        />
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Eco-Certified
        </div>
    </div>
    <div className="p-5">
      <h3 className="font-semibold text-gray-900 text-lg mb-2">{product.name}</h3>
      <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-600">₹{product.price}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            Add <ShoppingBag size={16} />
          </button>
      </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Create a new axios instance without credentials for public endpoints
        const publicApi = axios.create({
          baseURL: 'http://localhost:5000/api',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false // Don't send credentials for public endpoints
        });
        
        const response = await publicApi.get('/products');
        console.log('Products loaded:', response.data);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError('Failed to load products. Please make sure the backend server is running and try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const stats = [
    { icon: Package, label: "Products Sold", value: "10K+" },
    { icon: Recycle, label: "Items Recycled", value: "50K+" },
    { icon: Users, label: "Happy Customers", value: "5K+" },
  ];

  const steps = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      title: "Contribute Waste",
      description: "Give your recyclable items a new life. We accept plastics, paper, electronics, and more."
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1358/1358023.png",
      title: "We Process",
      description: "Our partners transform waste into quality products using eco-friendly processes."
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
      title: "Buy & Support",
      description: "Purchase recycled goods and be part of the circular economy movement."
    }
  ];

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page or show login modal
      window.location.href = '/login';
      return;
    }
    
    // TODO: Add to cart logic here
    console.log('Adding to cart:', product);
    // You can implement the actual add to cart functionality here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Announcement Bar */}
      <div className="bg-emerald-600 text-white text-center py-2.5 px-4 text-sm font-medium">
        <span className="inline-flex items-center gap-2">
          <TrendingUp size={16} />
          New arrivals: 30% off on selected eco-friendly products | Free shipping above ₹999
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-50 opacity-60"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200">
                <Leaf className="text-emerald-600" size={18} />
                <span className="text-sm font-semibold text-emerald-700">Sustainable Shopping Reinvented</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Shop <span className="text-emerald-600">Recycled</span>,<br />
                Support <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Sustainability</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Connect with sustainable solutions. Buy products made from recycled materials, contribute recyclables, and join our mission for a greener planet.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                  Shop Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 transition-all duration-200">
                  Browse Catalog
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <stat.icon className="mx-auto text-emerald-600 mb-2" size={24} />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1400&auto=format&fit=crop" 
                  alt="Recycled products" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join the circular economy in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl border border-emerald-100">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <img src={step.icon} alt={step.title} className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-6 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h2>
              <p className="text-gray-600">
                Shop our selection of high-quality recycled products 
                <span className="ml-2 text-emerald-600 font-medium">✦ Fresh arrivals weekly</span>
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>All categories</option>
                <option>Furniture</option>
                <option>Lighting</option>
                <option>Decor</option>
              </select>
              <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                View All <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin h-12 w-12 text-emerald-500" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <p className="text-gray-600">Please check your backend server and refresh the page.</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {products.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={{
                    ...product,
                    id: product._id,
                    // Use a default image if none is provided
                    image: product.image || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&q=80&fit=crop&w=400'
                  }}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No products available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Recycle className="text-white" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Start your sustainability journey today. Browse eco-friendly products or contribute your recyclable materials.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-emerald-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
              Browse Products
            </button>
            <button className="bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 border-2 border-white/20">
              Contribute Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Recycle className="text-emerald-500" size={28} />
                <span className="text-white text-xl font-bold">RecycKart</span>
              </div>
              <p className="text-sm text-gray-400">
                Building a sustainable future, one recycled product at a time.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Furniture</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Lighting</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Decor</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contribute</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            © 2025 RecycKart. All rights reserved. Made with 💚 for the planet.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;