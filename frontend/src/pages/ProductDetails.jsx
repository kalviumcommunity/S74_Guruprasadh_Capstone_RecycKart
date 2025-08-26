import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api'
import { useCart } from '../context/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const [prod, setProd] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    api.get('/products')
      .then(res => setProd(res.data.find(p => p._id === id)))
      .catch(() => setProd(null))
  }, [id])

  if (!prod) return <div className="mt-24 px-4">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4 grid md:grid-cols-2 gap-8">
      <div className="bg-white border rounded-lg overflow-hidden">
        <img src={prod.image} alt={prod.name} className="w-full h-80 object-cover" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{prod.name}</h2>
        <p className="text-green-700 text-2xl font-semibold mt-2">₹{prod.price}</p>
        <p className="text-gray-700 mt-4">{prod.description}</p>
        <button className="mt-6" onClick={() => addToCart(prod)}>Add to Cart</button>
      </div>
    </div>
  )
}
