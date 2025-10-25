const Product = require('../models/Product')
const path = require('path')

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
    let imagePath = ''
    
    if (req.file) {
      // Create a URL that points to the uploaded file
      imagePath = `/uploads/${req.file.filename}`
    }

    const newProduct = new Product({
      name,
      price,
      description,
      image: imagePath
    })

    const saved = await newProduct.save()
    res.status(201).json(saved)
  } catch (err) {
    console.error('Error adding product:', err)
    res.status(400).json({ 
      message: err.message || 'Error adding product',
      error: process.env.NODE_ENV === 'development' ? err : {}
    })
  }
}

const updateProduct = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Only admin or seller can update products' })
  }

  const { id } = req.params
  try {
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = { getAllProducts, addProduct, updateProduct }
