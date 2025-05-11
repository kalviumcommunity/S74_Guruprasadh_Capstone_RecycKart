const express = require('express')
const router = express.Router()
const { getAllProducts, addProduct, updateProduct } = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')

router.get('/', getAllProducts)
router.post('/add', protect, addProduct)
router.put('/update/:id', protect, updateProduct)

module.exports = router
