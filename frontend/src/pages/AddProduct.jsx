import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import React from 'react'

export default function AddProduct() {
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    description: '' 
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('price', form.price)
      formData.append('description', form.description)
      if (image) {
        formData.append('image', image)
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }

      await api.post('/products/add', formData, config)
      navigate('/products')
    } catch (err) {
      console.error('Error adding product:', err)
      alert(err.response?.data?.message || 'Could not add product')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form className="space-y-4 bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input 
            className="w-full border rounded p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            name="name" 
            placeholder="Enter product name" 
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
          <input 
            className="w-full border rounded p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            name="price" 
            type="number" 
            step="0.01"
            min="0"
            placeholder="Enter price" 
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            className="w-full border rounded p-3 h-32 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            name="description" 
            placeholder="Enter product description" 
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
          <div className="mt-1 flex items-center">
            <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Choose File
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <span className="ml-3 text-sm text-gray-500">
              {image ? image.name : 'No file chosen'}
            </span>
          </div>
          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
              <img src={preview} alt="Preview" className="h-32 object-cover rounded" />
            </div>
          )}
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
