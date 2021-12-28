require("../config/database")
const Router = require("express").Router()
const passport = require("../config/passport")
const validator = require("../config/validator")
const userControllers = require("../controllers/userControllers")
const messageControllers = require("../controllers/messageControllers")
const conversationControllers = require("../controllers/conversationControllers")
const {Route} = require("express")
const {newUser, logIn, tokenVerification, getUsers, getOneUser} =
  userControllers
const {addNewMessage, getMessage} = messageControllers
const {newConversation, getUserConversation, getTwoUsers} =
  conversationControllers

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

Router.route("/messages").post(addNewMessage)
Router.route("/messages/:conversationId").get(getMessage)
Router.route("/conversations").post(newConversation)
Router.route("/conversations/:userId").get(getUserConversation)
Router.route("/conversations/find/:firstUserId/:secondUserId").get(getTwoUsers)
Router.route("/user/:id").get(getOneUser)

module.exports = Router
