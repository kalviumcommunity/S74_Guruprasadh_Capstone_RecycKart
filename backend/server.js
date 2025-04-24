const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const productRoutes = require('./routes/productRoutes')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.use('/api/products', productRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
