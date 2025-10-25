import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'

export default function OrderConfirmation() {
  const location = useLocation()
  const navigate = useNavigate()
  const total = location.state?.total
  const params = new URLSearchParams(location.search)
  const paid = params.get('paid') === 'true'

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 mt-24 text-center">
      <div className="text-6xl">✅</div>
      <h2 className="text-2xl font-bold mt-4">{paid ? 'Payment Successful!' : 'Order Confirmed!'}</h2>
      {typeof total === 'number' ? (
        <p className="text-gray-700 mt-2">Total paid: ₹{total}</p>
      ) : (
        <p className="text-gray-700 mt-2">Thank you for your purchase.</p>
      )}
      <button className="mt-6" onClick={() => navigate('/')}>Back to Shop</button>
    </div>
  )
}
