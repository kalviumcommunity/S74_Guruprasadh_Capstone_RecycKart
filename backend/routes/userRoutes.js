const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/login', login)

// ✅ Protected Route
router.get('/profile', protect, (req, res) => {
  res.json({
    message: `Welcome ${req.user.name}`,
    email: req.user.email,
    role: req.user.role
  })
})

module.exports = router
