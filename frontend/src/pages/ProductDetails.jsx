import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api'
import React from 'react'
import { useCart } from '../context/CartContext'
import { FaMinus, FaPlus, FaShoppingCart, FaHeart, FaShare, FaTruck, FaUndo, FaShieldAlt, FaStar } from 'react-icons/fa'

export default function ProductDetails() {
  const { id } = useParams()
  const [prod, setProd] = useState(null)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    api.get('/products')
      .then(res => setProd(res.data.find(p => p._id === id)))
      .catch(() => setProd(null))
  }, [id])

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  if (!prod) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  const thumbnails = [prod.image, prod.image, prod.image, prod.image]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
          <span className="text-gray-400">/</span>
          <a href="/products" className="text-gray-500 hover:text-gray-700">Products</a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{prod.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column - Images */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 lg:p-12">
              {/* Main Image */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-6 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={`http://localhost:5000${prod.image}`} 
                  alt={prod.name} 
                  className="w-full h-96 object-contain transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Available'
                  }}
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === idx 
                        ? 'border-emerald-500 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={`http://localhost:5000${thumb}`}
                      alt={`${prod.name} view ${idx + 1}`}
                      className="w-full h-20 object-contain p-2 bg-white"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://via.placeholder.com/100x100?text=No+Image'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="p-8 lg:p-12 flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full mb-4">
                  {prod.category || 'Electronics'}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  {prod.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">4.9</span>
                  <span className="text-gray-400">|</span>
                  <a href="#reviews" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    248 reviews
                  </a>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-3">
                  <span className="text-5xl font-bold text-gray-900">₹{prod.price}</span>
                  <span className="text-2xl text-gray-400 line-through">₹{Math.round(prod.price * 1.3)}</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                    23% OFF
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaTruck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">Free Delivery</p>
                  <p className="text-xs text-gray-500 mt-1">On orders over ₹500</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaUndo className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-500 mt-1">30-day return policy</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaShieldAlt className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">Secure Payment</p>
                  <p className="text-xs text-gray-500 mt-1">100% protected</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </label>
                <div className="inline-flex items-center bg-gray-50 rounded-xl border-2 border-gray-200">
                  <button 
                    onClick={decrementQuantity}
                    className="px-5 py-3 text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    <FaMinus size={14} />
                  </button>
                  <span className="px-8 py-3 font-bold text-lg text-gray-900 border-x-2 border-gray-200 bg-white">
                    {quantity}
                  </span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-5 py-3 text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="text-emerald-600 font-semibold">In Stock</span> - Ships within 24 hours
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  onClick={() => addToCart({...prod, quantity})}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-8 rounded-xl flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold text-lg"
                >
                  <FaShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 font-medium border-2 ${
                      isWishlisted 
                        ? 'bg-red-50 border-red-300 text-red-600' 
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <FaHeart className={isWishlisted ? 'fill-current' : ''} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                  </button>
                  <button className="py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 font-medium border-2 bg-white border-gray-300 text-gray-700 hover:border-gray-400">
                    <FaShare />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-6 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <FaShieldAlt />
                    <span className="text-xs">Secure Checkout</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span className="text-xs">Customer Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}