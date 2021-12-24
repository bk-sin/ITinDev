require("../config/database")
const Router = require("express").Router()
const passport = require("../config/passport")
const validator = require("../config/validator")
const userControllers = require("../controllers/userControllers")
const {Route} = require("express")
const {newUser, logIn, tokenVerification,getUsers} = userControllers

Router.route('/users')
.get(getUsers)

Router.route("/auth/signUp").post(validator, newUser)

Router.route("/auth/signIn").post(logIn)

Router.route("/tokenVerification").get(
  passport.authenticate("jwt", {session: false}),
  tokenVerification
)

module.exports = Router
