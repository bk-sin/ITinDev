require("../config/database")
const Router = require("express").Router()
const passport = require("../config/passport")
const validator = require("../config/validator")
const userControllers = require("../controllers/userControllers")
const matchsControllers = require("../controllers/matchsControllers")
const messageControllers = require("../controllers/messageControllers")
const conversationControllers = require("../controllers/conversationControllers")
const adminControllers = require("../controllers/adminControllers")

const {Route} = require("express")
const {newUser, logIn, tokenVerification, getUsers, getOneUser} =
  userControllers
const {addNewMessage, getMessage} = messageControllers
const {newConversation, getUserConversation, getTwoUsers} =
  conversationControllers
const {matchsAndDismatchs, noMatchUsers, matchUsers} = matchsControllers
const {deletePeople, editUser, setBan} = adminControllers

Router.route("/users").get(getUsers)
Router.route("/admin/deleteUser/:id").put(
  passport.authenticate("jwt", {session: false}),
  deletePeople
)
Router.route("/admin/ban/:id").put(
  passport.authenticate("jwt", {session: false}),
  setBan
)

Router.route("/admin/editUser/:id").put(
  passport.authenticate("jwt", {session: false}),
  editUser
)

Router.route("/auth/signup").post(validator, newUser)

Router.route("/auth/signin").post(logIn)

Router.route("/tokenVerification").get(
  passport.authenticate("jwt", {session: false}),
  tokenVerification
)
Router.route("/match/:id").put(
  passport.authenticate("jwt", {session: false}),
  matchsAndDismatchs
),
  Router.route("/disMatch/:id").put(
    passport.authenticate("jwt", {session: false}),
    matchsAndDismatchs
  ),
  Router.route("/user/matchs/:id").get(matchUsers)
Router.route("/user/nomatchs/:id").get(noMatchUsers)

Router.route("/messages").post(addNewMessage)
Router.route("/messages/:conversationId").get(getMessage)
Router.route("/conversations/:recieverId").post(
  passport.authenticate("jwt", {session: false}),
  newConversation
)
Router.route("/conversations/:userId").get(getUserConversation)
Router.route("/conversations/find/:firstUserId/:secondUserId").get(getTwoUsers)
Router.route("/user/:id").get(getOneUser)

module.exports = Router
