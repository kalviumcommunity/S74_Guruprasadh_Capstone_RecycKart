const express = require('express')
const router = express.Router()
const { getAllProducts, addProduct, updateProduct } = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')
const multer = require('multer')
const path = require('path')

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'))
    }
  }
})

router.get('/', getAllProducts)
router.post('/add', protect, upload.single('image'), addProduct)
router.put('/update/:id', protect, upload.single('image'), updateProduct)

module.exports = router
