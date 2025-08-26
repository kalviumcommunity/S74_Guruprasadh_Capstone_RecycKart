import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function AddProduct() {
  const [form, setForm] = useState({ name: '', price: '', description: '' })
  const navigate = useNavigate()

  const handle = async e => {
    e.preventDefault()
    try {
      await api.post('/products/add', form)
      navigate('/products')
    } catch (err) {
      alert(err.response?.data?.message || 'Could not add product')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-24 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h2>
      <form className="space-y-4 bg-white p-6 rounded-lg shadow" onSubmit={handle}>
        <input className="w-full border rounded p-3" name="name" placeholder="Product Name" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} required/>
        <input className="w-full border rounded p-3" name="price" type="number" placeholder="Price" value={form.price}
          onChange={e => setForm({...form, price: e.target.value})} required/>
        <textarea className="w-full border rounded p-3" name="description" placeholder="Description" value={form.description}
          onChange={e => setForm({...form, description: e.target.value})} required/>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Submit</button>
      </form>
    </div>
  )
}
