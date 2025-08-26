import { useState } from 'react'
import api from '../utils/api'

export default function Contribution() {
  const [mat, setMat] = useState('')
  const [desc, setDesc] = useState('')

  const handle = async e => {
    e.preventDefault()
    try {
      await api.post('/contributions/add', { material: mat, description: desc })
      alert('Thanks for contributing!')
    } catch {
      alert('You must be logged in to contribute')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-24 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contribute Material</h2>
      <form className="space-y-4 bg-white p-6 rounded-lg shadow" onSubmit={handle}>
        <input className="w-full border rounded p-3" placeholder="Material" value={mat} onChange={e => setMat(e.target.value)} required/>
        <textarea className="w-full border rounded p-3" rows="5" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} required/>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Submit</button>
      </form>
    </div>
  )
}
