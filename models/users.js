const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  country: {type: String, requiere: true},
  gender: {type: String, required: true},
  image: {type: String},

})

const Users = mongoose.model("users", usersSchema)

module.exports = Users
