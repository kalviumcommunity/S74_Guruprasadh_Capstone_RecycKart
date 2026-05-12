const fs = require('fs')
const Product = require('../models/Product')
const cloudinary = require('../config/cloudinary')

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' })
  }
}

const addProduct = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Only admin or seller can add products' })
  }

  try {
    const { name, price, description } = req.body

    const priceNum = Number(price)
    if (Number.isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({ message: 'Invalid price' })
    }

    let imageUrl = ''
    let imageId = ''

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'recyckart_products',
        })
        imageUrl = result.secure_url
        imageId = result.public_id || ''
      } finally {
        try {
          fs.unlinkSync(req.file.path)
        } catch (_) {}
      }
    }

    const newProduct = new Product({
      name,
      price: priceNum,
      description,
      image: imageUrl,
      imageId: imageId || undefined,
    })

    const saved = await newProduct.save()
    res.status(201).json(saved)
  } catch (err) {
    console.error('Error adding product:', err)
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (_) {}
    }
    res.status(400).json({
      message: err.message || 'Error adding product',
      error: process.env.NODE_ENV === 'development' ? err : {},
    })
  }
}

const updateProduct = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Only admin or seller can update products' })
  }

  const { id } = req.params
  try {
    const payload = { ...req.body }

    if (payload.price !== undefined) {
      const priceNum = Number(payload.price)
      if (Number.isNaN(priceNum) || priceNum < 0) {
        return res.status(400).json({ message: 'Invalid price' })
      }
      payload.price = priceNum
    }

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'recyckart_products',
        })
        payload.image = result.secure_url
        payload.imageId = result.public_id || ''
      } finally {
        try {
          fs.unlinkSync(req.file.path)
        } catch (_) {}
      }
    }

    const updated = await Product.findByIdAndUpdate(id, payload, { new: true })
    if (!updated) return res.status(404).json({ message: 'Not found' })
    res.json(updated)
  } catch (err) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (_) {}
    }
    res.status(400).json({ message: err.message })
  }
}

module.exports = { getAllProducts, addProduct, updateProduct }
