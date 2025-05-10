const User = require('../models/User')
const jwt = require('jsonwebtoken')

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })

const register = async (req, res) => {
  const { name, email, password } = req.body

  let role = 'user'
  if (email === 'admin@recyckart.com') {
    role = 'admin'
  } else if (email.endsWith('@recyckart.com')) {
    role = 'seller'
  }

  try {
    const user = await User.create({ name, email, password, role })
    res.status(201).json({ token: generateToken(user._id) })
  } catch (err) {
    res.status(400).json({ message: 'User already exists' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user && await user.comparePassword(password)) {
      res.json({ token: generateToken(user._id) })
    } else {
      res.status(400).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { register, login }
