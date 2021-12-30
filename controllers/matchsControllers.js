const User = require("../models/user")

const matchsControllers = {
  noMatchUsers: async (req, res) => {
    const matchsId = req.params.id
    console.log(req.params)
    try {
      const matchsList = await User.find({matchs: {$ne: matchsId}})
      console.log(matchsList)

      if (matchsList.length != 0) {
        res.json({success: true, respuesta: matchsList})
      } else {
        res.json({success: false, respuesta: []})
      }
    } catch (error) {
      res.json({success: false, respuesta: "Oops!error"})
    }
  },
  matchUsers: async (req, res) => {
    const matchsId = req.params.id
    try {
      const matchsList = await User.find({matchs: matchsId})
      if (matchsList.length != 0) {
        res.json({success: true, respuesta: matchsList})
      } else {
        res.json({success: false, respuesta: []})
      }
    } catch (error) {
      res.json({success: false, respuesta: "Oops!error"})
    }
  },
  matchsAndDismatchs: (req, res) => {
    User.findOne({_id: req.params.id})
      .then((user) => {
        if (user.matchs.includes(req.user._id)) {
          User.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {matchs: req.user.id}},
            {new: true}
          )
            .then((user) => res.json({success: true, response: user.matchs}))
            .catch((error) => console.log(error))
        } else {
          User.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {matchs: req.user.id}},
            {new: true}
          )
            .then((user) => res.json({success: true, response: user.matchs}))
            .catch((error) => console.log(error))
        }
      })
      .catch((error) => res.json({success: false, response: error}))
  },
}
module.exports = matchsControllers
