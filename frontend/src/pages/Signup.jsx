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
    <form className="form" onSubmit={handle}>
      <h2>Sign Up</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
      <input type="email" placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  )
}
