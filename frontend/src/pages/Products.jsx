import { useEffect, useState } from 'react'
import api from '../utils/api'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [list, setList] = useState([])

  useEffect(() => {
    api.get('/products')
      .then(res => setList(Array.isArray(res.data) ? res.data : []))
      .catch(() => setList([]))
  }, [])

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  )
}
