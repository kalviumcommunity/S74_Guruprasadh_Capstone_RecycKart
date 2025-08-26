import { useState } from 'react'

export default function Partner() {
  const [form, setForm] = useState({ org: '', contact: '', message: '' })

  const submit = e => {
    e.preventDefault()
    alert('Thanks! We will reach out shortly.')
    setForm({ org: '', contact: '', message: '' })
  }

  return (
    <div className="max-w-2xl mx-auto mt-24 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Partner With RecycKart</h2>
      <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <input className="w-full border rounded p-3" placeholder="Organization Name" value={form.org}
          onChange={e => setForm({ ...form, org: e.target.value })} required />
        <input className="w-full border rounded p-3" placeholder="Contact Email / Phone" value={form.contact}
          onChange={e => setForm({ ...form, contact: e.target.value })} required />
        <textarea className="w-full border rounded p-3" rows="5" placeholder="Tell us about your recycling capabilities"
          value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Submit</button>
      </form>
    </div>
  )
}


