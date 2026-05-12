const multer = require('multer')
const os = require('os')
const path = require('path')

// Temp disk storage — files are uploaded to Cloudinary then deleted (see productController)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir())
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${path.basename(file.originalname).replace(/\s+/g, '_')}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      return cb(null, true)
    }
    cb(new Error('Only image files are allowed'))
  },
})

module.exports = upload
