const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['user', 'seller', 'admin'],
    default: 'user'
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  // Set role based on email
  if (this.email === 'admin@recyckart.com') {
    this.role = 'admin'
  } else if (this.email.endsWith('@recyckart.com')) {
    this.role = 'seller'
  }

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
