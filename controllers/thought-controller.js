const { Thought, User } = require('../models')

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err))
  },
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err))
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughtData._id } },
          { new: true }
        )
      })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err))
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: 'No thought by ID' })
          : res.json(thought)
      })
      .catch((err) => res.status(500).json(err))
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then(
        (thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : console.log('Deleted')
        // : Reaction.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() =>
        res.json({ message: 'Thought and associated reactions deleted!' })
      )
      .catch((err) => res.status(500).json(err))
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No friend found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err))
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        // console.log("get the deleteReaction")
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err))
  },
}

module.exports = thoughtController
