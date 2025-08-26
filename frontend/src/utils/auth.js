// utils/auth.js

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function logout() {
  localStorage.removeItem('token')
}

// Extract role from token (since we only store token, and token has user id, not role)
// We'll need to fetch user profile if needed, but here just return a dummy for demo

// But your backend is not returning role in token – fix with backend if needed
export function getRole() {
  const token = getToken()
  if (!token) return null

  const payload = JSON.parse(atob(token.split('.')[1]))
  // optional chaining if payload is malformed
  return payload?.role || null
}
