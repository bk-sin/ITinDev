const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  country: {type: String, requiere: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  age: {type: Number, required: true},
  gender: {type: String, required: true},
<<<<<<< HEAD
=======
  description: {type: String},
  matchs: [{type: mongoose.Types.ObjectId, ref: "user"}],
  disMatchs: [{type: mongoose.Types.ObjectId, ref: "user"}],
>>>>>>> 840de9b9bd51b3a59be51497a2cdf72c3b2b9d80
  image: {type: String, required: true},
  google: {type: Boolean, default: false},
  admin: {type: Boolean, default: false},
  banned: {type: Boolean, default: false},
})

const User = mongoose.model("user", userSchema)

module.exports = User
