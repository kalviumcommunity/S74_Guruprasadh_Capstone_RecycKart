const mongoose = require('mongoose')

const contributionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  contributionType: { 
    type: String, 
    required: true,
    enum: ['money', 'materials', 'volunteer']
  },
  amount: { type: Number, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  imageUrls: { type: [String], default: [] }
}, { timestamps: true })

module.exports = mongoose.model('Contribution', contributionSchema)
