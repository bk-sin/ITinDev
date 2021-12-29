const User = require("../models/user")
const Users = require("../models/users")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userControllers = {
  newUser: async (req, res) => {
    let {
      name,
      lastName,
      country,
      email,
      age,
      password,
      gender,
      description,
      matchs,
      disMatchs,
      image,
      google,
    } = req.body

    try {
      const userExists = await User.findOne({email})
      if (userExists) {
        res.json({
          success: false,
          error: "Email already exist",
          response: null,
        })
      } else {
        password = bcryptjs.hashSync(password, 10)

        const newUser = new User({
          name,
          lastName,
          country,
          email,
          age,
          password,
          description,
          gender,
          matchs,
          disMatchs,
          image,
          google,
        })

        const token = jwt.sign({...newUser}, process.env.SECRET_KEY)

        await newUser.save()

        res.json({
          success: true,
          response: {token, newUser, image},
          error: null,
        })
      }
    } catch (error) {
      res.json({success: false, response: null, error: error})
    }
  },
  logIn: async (req, res) => {
    const {email, password} = req.body
    try {
      const user = await User.findOne({email})
      if (user) {
        const passwordIsOk = bcryptjs.compareSync(password, user.password)
        if (passwordIsOk) {
          const token = jwt.sign({...user}, process.env.SECRET_KEY)
          res.json({
            success: true,
            response: {
              name: user.name,
              lastname: user.lastname,
              email: user.email,
              country: user.country,
              image: user.image,
              token,
              admin: user.admin,
            },

            error: null,
          })
        } else {
          res.json({
            success: false,
            response: null,
            error: "Password is incorrect!",
          })
        }
      } else {
        res.json({
          success: false,
          response: null,
          error: "Email doesnt exist!",
        })
      }
    } catch (error) {
      res.json({
        success: false,
        response: null,
        error: error,
      })
    }
  },

  getUsers: async (req, res) => {
    try {
      const usersList = await User.find().populate("matchs")

      res.json({success: true, respuesta: usersList})
    } catch (error) {
      console.log(error)
      res.json({success: false, respuesta: "Oops! error"})
    }
  },
  tokenVerification: (req, res) => {
    req.user.admin
      ? console.log(`Verified Admin: ${req.user.name}`)
      : console.log(`Verified User: ${req.user.name}`)
    res.json({
      name: req.user.name,
      admin: req.user.admin,
      image: req.user.image,
      matchs: req.user.matchs,
      _id: req.user._id,
    })
  },
  getOneUser: async (req, res) => {
    try {
      console.log(req.params.id)
      let user = await User.findById(req.params.id)
      res.json({res: user})
    } catch (err) {
      return res.status(400).json({
        message: "cannot fetch user",
        res: err.message,
      })
    }
  },
}

module.exports = userControllers
