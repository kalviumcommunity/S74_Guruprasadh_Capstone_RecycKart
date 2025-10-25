import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import api from '../utils/api'
import { FaTrash, FaShoppingBag, FaLock, FaArrowLeft, FaTags } from 'react-icons/fa'

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = cartItems.reduce((a, i) => a + (i.price * (i.quantity || 1)), 0)
  const tax = subtotal * 0.18 // 18% GST
  const shipping = subtotal > 999 ? 0 : 50
  const total = subtotal + tax + shipping - discount

  const handleCheckout = async () => {
    setIsProcessing(true)
    try {
      const res = await api.post('/create-checkout-session', { items: cartItems })
      const url = res.data?.url
      if (url) {
        window.location.href = url
      }
    } catch {
      clearCart()
      navigate('/order-confirmation', { state: { total } })
    } finally {
      setIsProcessing(false)
    }
  }

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <FaArrowLeft />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {!cartItems.length ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
              <FaShoppingBag className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div 
                  key={item._id || item.id} 
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden">
                          <img 
                            src={`http://localhost:5000${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = 'https://via.placeholder.com/150x150?text=No+Image'
                            }}
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">{item.category || 'Electronics'}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove item"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center bg-gray-50 rounded-lg border-2 border-gray-200">
                            <button 
                              onClick={() => updateQuantity?.(item, Math.max(1, (item.quantity || 1) - 1))}
                              className="px-3 py-2 text-gray-600 hover:text-emerald-600 transition-colors"
                            >
                              −
                            </button>
                            <span className="px-4 py-2 font-semibold text-gray-900 border-x-2 border-gray-200 bg-white">
                              {item.quantity || 1}
                            </span>
                            <button 
                              onClick={() => updateQuantity?.(item, (item.quantity || 1) + 1)}
                              className="px-3 py-2 text-gray-600 hover:text-emerald-600 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₹{item.price} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button 
                onClick={clearCart}
                className="w-full py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors border-2 border-red-200"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Coupon Code */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <FaTags className="inline mr-2" />
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                    <button 
                      onClick={applyCoupon}
                      className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600 mt-2 font-medium">
                      ✓ Coupon applied! You saved ₹{discount.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (GST 18%)</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  {subtotal > 0 && subtotal < 999 && (
                    <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                      Add ₹{(999 - subtotal).toFixed(2)} more for FREE shipping!
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6 pb-6 border-t border-b border-gray-200 pt-6">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-emerald-600">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-8 rounded-xl flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaLock />
                  <span>{isProcessing ? 'Processing...' : 'Proceed to Checkout'}</span>
                </button>

                {/* Security Badges */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                    <FaLock className="text-green-600" />
                    <span>Secure SSL Encrypted Payment</span>
                  </div>
                  <div className="flex justify-center space-x-4 text-gray-400">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}