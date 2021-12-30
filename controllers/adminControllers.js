const User = require("../models/user")

const adminControllers = {
  deletePeople: async (req, res) => {
    if (req.user.admin) {
      User.findOneAndRemove({_id: req.params.id}).then(async (response) => {
        const all = await User.find()
        res.json(all)
      })
    } else {
      console.log("You must be admin")
    }
  },
  editUser: async (req, res) => {
    const id = req.params.id

    User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: req.body,
      },
      {new: true}
    )
      .then(async (response) => {
        const all = await User.find()
        res.json(all)
      })
      .catch((err) => {
        res.json({success: false, response: err})
      })
  },

  assignAdminAndDeletedAdmin: (req, res) => {
    User.findOne({_id: req.params.id})
      .then((user) => {
        if (req.user._id === " ") {
          if (user.admin === true) {
            User.findOneAndUpdate(
              {_id: req.params.id},
              {$set: {admin: false}},
              {new: true}
            )
              .then((user) => res.json({success: true, response: user.admin}))
              .catch((error) => console.log(error))
          } else {
            User.findOneAndUpdate(
              {_id: req.params.id},
              {$set: {admin: true}},
              {new: true}
            )
              .then((user) => res.json({success: true, response: user.admin}))
              .catch((error) => console.log(error))
          }
        }
      })
      .catch((error) => res.json({success: false, response: error}))
  },
  setBan: (req, res) => {
    User.findOne({_id: req.params.id})
      .then((user) => {
        if (user.banned) {
          User.findOneAndUpdate(
            {_id: req.params.id},
            {banned: false},
            {new: true}
          )
            .then(async (user) => {
              console.log("banned " + user)
              const all = await User.find()
              res.json(all)
            })
            .catch((error) => console.log(error))
        } else {
          User.findOneAndUpdate(
            {_id: req.params.id},
            {banned: true},
            {new: true}
          )
            .then(async (user) => {
              console.log("banned " + user)

              const all = await User.find()
              res.json(all)
            })
            .catch((error) => console.log(error))
        }
      })
      .catch((error) => res.json({success: false, response: error}))
  },
}
module.exports = adminControllers
