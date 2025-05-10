const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
}

const addProduct = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Only admin or seller can add products' })
  }

  const { name, price, description } = req.body
  const newProduct = new Product({ name, price, description })

  try {
    const saved = await newProduct.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
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
