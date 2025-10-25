const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String, // URL to the uploaded image
  imageId: String // Optional: Store the public_id from cloudinary if using it
})

module.exports = mongoose.model('Product', productSchema)
