import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { setToken } from '../utils/auth'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handle = async e => {
    e.preventDefault()
    try {
      const res = await api.post('/users/register', { name, email, password })
      setToken(res.data.token)
      navigate('/')
    } catch {
      alert('Signup failed.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
      <form className="w-full max-w-md bg-white p-8 rounded-lg shadow" onSubmit={handle}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <input className="w-full border rounded p-3 mb-3" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
        <input className="w-full border rounded p-3 mb-3" type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input className="w-full border rounded p-3 mb-4" type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="w-full">Register</button>
      </form>
    </div>
  )
}
