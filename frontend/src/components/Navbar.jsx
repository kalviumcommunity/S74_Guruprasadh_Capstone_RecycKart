import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { logout, getRole } from '../utils/auth'
import React from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const role = getRole()
  const [query, setQuery] = useState('')
  const { cartItems } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 md:px-6 py-3">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        
        {/* LEFT: Logo */}
        <div className="text-xl md:text-2xl font-extrabold text-green-700 justify-self-start order-1">
          <Link to="/">RecycKart</Link>
        </div>

        {/* CENTER: Links + Search */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 justify-self-center order-3 md:order-2 w-full">
          {/* Menu */}
          <div className="flex gap-6 text-gray-700 font-medium">
            <Link to="/products" className="hover:text-green-700">Products</Link>
            <Link to="/contribute" className="hover:text-green-700">Contribute</Link>
            <Link to="/partner" className="hover:text-green-700">Partner</Link>
          </div>

          {/* Search */}
          <div className="relative w-full max-w-sm hidden md:block">
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">🔍</span>
            <input
              className="w-full border rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const trimmed = query.trim()
                  if (trimmed.length > 0) {
                    navigate(`/products?q=${encodeURIComponent(trimmed)}`)
                  } else {
                    navigate('/products')
                  }
                }
              }}
            />
          </div>
        </div>

        {/* RIGHT: Cart + Auth */}
        <div className="flex justify-end items-center gap-4 justify-self-end order-2 md:order-3 w-full md:w-auto">
          <Link to="/cart" className="relative border px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartItems.length}
              </span>
            )}
          </Link>
          {role ? (
            <>
              {(role === 'admin' || role === 'seller') && (
                <Link
                  to="/add-product"
                  className="bg-white text-green-700 border border-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition"
                >
                  Add Product
                </Link>
              )}
              <button
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 border-2 border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                style={{
                  minWidth: '100px',
                  textAlign: 'center',
                  lineHeight: '1.5',
                  backgroundColor: 'white'
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white !text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
