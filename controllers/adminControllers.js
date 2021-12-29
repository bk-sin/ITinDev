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
        console.log(response)
        const all = await User.find()
        res.json(all)
      })
      .catch((err) => {
        res.json({success: false, response: err})
      })
  },
}
module.exports = adminControllers
