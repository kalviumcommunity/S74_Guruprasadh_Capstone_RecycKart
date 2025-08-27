import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = product => {
    setCartItems(prev => [...prev, product])
  }

  const removeFromCart = product => {
    setCartItems(prev => prev.filter(p => p._id ? p._id !== product._id : p.id !== product.id))
  }

  const clearCart = () => setCartItems([])

  const value = useMemo(() => ({ cartItems, addToCart, removeFromCart, clearCart }), [cartItems])

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}



