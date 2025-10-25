import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getRole } from '../utils/auth'

export default function ProtectedRoute({ children, roles }) {
  const role = getRole()
  const location = useLocation()
  
  // If no roles are required, just return children
  if (!roles) {
    return children
  }
  
  // If user doesn't have a role or their role isn't in the allowed roles, redirect to login
  if (!role || (roles.length > 0 && !roles.includes(role))) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  // User has required role, render the protected content
  return children
}
