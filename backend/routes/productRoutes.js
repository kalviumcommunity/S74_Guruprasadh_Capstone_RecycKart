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
router.post('/', async (req, res) => {
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

module.exports = router
