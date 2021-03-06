const Conversation = require("../models/Conversation")

const conversationControllers = {
  newConversation: async (req, res) => {
    const newConversation = new Conversation({
      members: [req.user._id.toString(), req.params.recieverId],
    })

    try {
      const savedConversation = await newConversation.save()
      res.status(200).json(savedConversation)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getUserConversation: async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: {$in: [req.params.userId]},
      })
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getTwoUsers: async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: {$all: [req.params.firstUserId, req.params.secondUserId]},
      })
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = conversationControllers
