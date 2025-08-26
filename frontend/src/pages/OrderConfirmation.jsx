import { useLocation, useNavigate } from 'react-router-dom'

export default function OrderConfirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const total = state?.total

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 mt-24 text-center">
      <div className="text-6xl">✅</div>
      <h2 className="text-2xl font-bold mt-4">Order Confirmed!</h2>
      <p className="text-gray-700 mt-2">Total paid: ₹{total}</p>
      <button className="mt-6" onClick={() => navigate('/')}>Back to Shop</button>
    </div>
  )
}
