const Contribution = require('../models/Contribution')
const User = require('./userController')

// @desc    Create a new contribution
// @route   POST /api/contributions
// @access  Private
const createContribution = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      contributionType,
      amount,
      description
    } = req.body

    // If user is logged in, attach their ID
    const userId = req.user ? req.user.id : null

    const contribution = await Contribution.create({
      user: userId,
      name,
      email,
      phone,
      address,
      contributionType,
      amount: parseFloat(amount),
      description,
      status: 'pending'
    })

    res.status(201).json({
      success: true,
      data: contribution
    })
  } catch (error) {
    console.error('Error creating contribution:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}

// @desc    Get all contributions (for admin)
// @route   GET /api/contributions
// @access  Private/Admin
const getContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: contributions.length,
      data: contributions
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get contribution by ID
// @route   GET /api/contributions/:id
// @access  Private
const getContributionById = async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id)
    
    if (!contribution) {
      return res.status(404).json({
        success: false,
        message: 'Contribution not found'
      })
    }

    // Check if user is authorized to view this contribution
    if (contribution.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view this contribution'
      })
    }

    res.status(200).json({
      success: true,
      data: contribution
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Update contribution status
// @route   PUT /api/contributions/:id/status
// @access  Private/Admin
const updateContributionStatus = async (req, res) => {
  try {
    const { status } = req.body
    
    const contribution = await Contribution.findById(req.params.id)
    
    if (!contribution) {
      return res.status(404).json({
        success: false,
        message: 'Contribution not found'
      })
    }

    contribution.status = status
    await contribution.save()

    res.status(200).json({
      success: true,
      data: contribution
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Get user's contributions
// @route   GET /api/contributions/user/:userId
// @access  Private
const getUserContributions = async (req, res) => {
  try {
    // Check if user is authorized
    if (req.params.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view these contributions'
      })
    }

    const contributions = await Contribution.find({ user: req.params.userId })
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: contributions.length,
      data: contributions
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

module.exports = {
  createContribution,
  getContributions,
  getContributionById,
  updateContributionStatus,
  getUserContributions
}
