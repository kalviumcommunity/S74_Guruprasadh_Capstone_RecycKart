const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Directly use role and id from token to avoid extra DB call
    req.user = {
      id: decoded.id,
      role: decoded.role
    }

    next()
  } catch (err) {
    console.error('❌ Token verification failed:', err.message)
    res.status(401).json({ message: 'Token invalid' })
  }
}

module.exports = protect
