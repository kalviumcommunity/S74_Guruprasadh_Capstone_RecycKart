const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST a new product
router.post('/add', async (req, res) => {
  const { name, price, description } = req.body

  const newProduct = new Product({
    name,
    price,
    description
  })

  try {
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/update/:id', async (req, res) => {
  const { name, price, description } = req.body

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description },
      { new: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(updatedProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
