const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: {
    type: String,
  },
  imageId: {
    type: String,
  },
})

module.exports = mongoose.model('Product', productSchema)
