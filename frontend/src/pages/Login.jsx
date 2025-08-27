import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { setToken } from '../utils/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handle = async e => {
    e.preventDefault()
    try {
      const res = await api.post('/users/login', { email, password })
      setToken(res.data.token)
      navigate('/')
    } catch {
      alert('Login failed.')
    }
  }

  return (
    <form className="form" onSubmit={handle}>
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  )
}
