const express = require('express')
const router = express.Router()
const { getAllProducts, addProduct, updateProduct } = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

router.get('/', getAllProducts)
router.post('/add', protect, upload.single('image'), addProduct)
router.put('/update/:id', protect, upload.single('image'), updateProduct)

module.exports = router
