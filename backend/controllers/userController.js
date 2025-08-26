const User = require('../models/User')
const jwt = require('jsonwebtoken')

// ✅ Updated Token generation with role
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' })

// ✅ REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body
  console.log("👉 Register attempt received:", { name, email })

  let role = 'user'
  if (email === 'admin@recyckart.com') {
    role = 'admin'
  } else if (email.endsWith('@recyckart.com')) {
    role = 'seller'
  }

  try {
    const user = await User.create({ name, email, password, role })
    console.log("✅ User created successfully:", user.email)
    res.status(201).json({ token: generateToken(user._id, user.role) })
  } catch (err) {
    console.error("❌ Error in register:", err)
    res.status(400).json({ message: err.message })
  }
}

// ✅ LOGIN
const login = async (req, res) => {
  const { email, password } = req.body
  console.log("🔐 Login attempt:", email)

  try {
    const user = await User.findOne({ email })

    if (user && await user.comparePassword(password)) {
      console.log("✅ Login successful for:", user.email)
      res.json({ token: generateToken(user._id, user.role) })
    } else {
      console.warn("❌ Invalid credentials for:", email)
      res.status(400).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    console.error("❌ Error in login:", err)
    res.status(500).json({ message: err.message })
  }
}

module.exports = { register, login }
