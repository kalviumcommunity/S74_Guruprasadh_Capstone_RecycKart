const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { 
  createContribution,
  getContributions,
  getContributionById,
  updateContributionStatus,
  getUserContributions
} = require('../controllers/contributionController')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadsDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, unique + ext)
  }
})

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg']
  if (allowed.includes(file.mimetype)) cb(null, true)
  else cb(new Error('Only JPG/PNG images are allowed'))
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024, files: 3 } })

// Create a new contribution
router.post('/', protect, upload.array('images', 3), createContribution)

module.exports = router
