const mongoose = require('mongoose')

const contributionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  material: String,
  description: String
})

module.exports = mongoose.model('Contribution', contributionSchema)
