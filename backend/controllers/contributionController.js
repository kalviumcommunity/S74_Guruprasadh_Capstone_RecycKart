const Contribution = require('../models/Contribution')

const addContribution = async (req, res) => {
  const { material, description } = req.body
  try {
    const contribution = await Contribution.create({
      user: req.user.id,
      material,
      description
    })
    res.status(201).json(contribution)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = { addContribution }
