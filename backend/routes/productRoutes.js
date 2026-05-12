const express = require('express')
const router = express.Router()
const { getAllProducts, addProduct, updateProduct } = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadDir = path.join(__dirname, '..', 'uploads')

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(uploadDir, { recursive: true })
      cb(null, uploadDir)
    } catch (err) {
      cb(err)
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      return cb(null, true)
    }
    cb(new Error('Only image files are allowed'))
  }
})

router.get('/', getAllProducts)
router.post('/add', protect, upload.single('image'), addProduct)
router.put('/update/:id', protect, upload.single('image'), updateProduct)

module.exports = router
