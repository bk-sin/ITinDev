require("../config/database")
const Router = require("express").Router()
const passport = require("../config/passport")
const validator = require("../config/validator")
const userControllers = require("../controllers/userControllers")
const matchsControllers = require("../controllers/matchsControllers")
const {matchUsers, matchsAndDismatchs, noMatchUsers} = matchsControllers
const {Route} = require("express")
const {newUser, logIn, tokenVerification, getUsers} = userControllers

Router.route("/users").get(getUsers)

Router.route("/auth/signUp").post(validator, newUser)

Router.route("/auth/signIn").post(logIn)

Router.route("/tokenVerification").get(
  passport.authenticate("jwt", {session: false}),
  tokenVerification
)
Router.route("/match/:id").put(
  passport.authenticate("jwt", {session: false}),
  matchsAndDismatchs
),
  Router.route("/user/nomatchs/:id").get(noMatchUsers)
Router.route("/user/matchs/:id").get(matchUsers)

module.exports = Router
