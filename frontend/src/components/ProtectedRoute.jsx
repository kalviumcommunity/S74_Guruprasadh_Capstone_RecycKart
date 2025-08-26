import { Navigate } from 'react-router-dom'
import { getRole } from '../utils/auth'

export default function ProtectedRoute({ children, roles }) {
  const role = getRole()
  if (!role || (roles && !roles.includes(role))) return <Navigate to="/login" />
  return children
}
