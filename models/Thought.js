const { Schema, model } = require('mongoose')

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Schema.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //NEED GETTER METHOD TO FORMAT TIMESTAMP
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
)

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //NEED GETTER METHOD TO FORMAT TIMESTAMP
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
)

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema)

module.exports = Thought
