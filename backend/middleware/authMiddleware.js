const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Get user from database to include name and email
    const user = await User.findById(decoded.id).select('-password')
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }

    next()
  } catch (err) {
    console.error('❌ Token verification failed:', err.message)
    res.status(401).json({ message: 'Token invalid' })
  }
}

module.exports = protect
