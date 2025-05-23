const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const contributionRoutes = require('./routes/contributionRoutes')

dotenv.config()
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/contributions', contributionRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
