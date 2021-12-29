const User = require("../models/user")

const adminControllers = {
  deletePeople: (req, res) => {
    console.log(req.user)
    if (req.user.admin) {
      User.findOneAndRemove({_id: req.params.id}).then((response) => {
        console.log(response)
      })
    } else {
      console.log("You must be admin")
    }
  },
  delOrEditComment: async (req, res) => {
    const commentID = req.body.commentID
    const edit = req.body.edit
    const itineraryID = req.body.itineraryID
    const type = req.body.type

    if (type === "DEL") {
      Itinerary.updateOne(
        {
          _id: itineraryID,
        },
        {
          $pull: {
            comments: {
              _id: commentID,
            },
          },
        },
        {new: true}
      )
        .populate("comments.user")
        .then((response) => {
          res.json({success: true, response: response})
        })
        .catch((err) => {
          res.json({success: false, response: err})
        })
    } else if (type === "MOD") {
      Itinerary.updateOne(
        {
          _id: itineraryID,
          "comments._id": commentID,
        },
        {
          "comments.$.comment": edit,
        },
        {new: true}
      )
        .populate("comments.user")
        .then((response) => {
          res.json({success: true, response: response})
        })
        .catch((err) => {
          res.json({success: false, response: err})
        })
    } else {
      res.json({success: false, response: "Bad type"})
    }
  },
}
module.exports = adminControllers
