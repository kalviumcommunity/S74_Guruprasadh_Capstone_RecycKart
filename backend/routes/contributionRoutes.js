const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { addContribution } = require('../controllers/contributionController')

router.post('/add', protect, addContribution)

module.exports = router
