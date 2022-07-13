const router = require('express').Router()

const {
  getThoughts,
  getThoughtByID,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thought-controller')

module.exports = router
