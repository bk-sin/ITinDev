require("../config/database")
const Router = require("express").Router()
const passport = require("../config/passport")
const validator = require("../config/validator")
const userControllers = require("../controllers/userControllers")
<<<<<<< HEAD
const {Route} = require("express")
const {newUser, logIn, tokenVerification, getUsers} = userControllers
=======
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
>>>>>>> 840de9b9bd51b3a59be51497a2cdf72c3b2b9d80

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

Router.route("/auth/signUp").post(validator, newUser)

Router.route("/auth/signIn").post(logIn)

Router.route("/tokenVerification").get(
  passport.authenticate("jwt", {session: false}),
  tokenVerification
)

module.exports = Router
