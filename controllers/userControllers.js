const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userControllers = {
  newUser: async (req, res) => {
    let {name, lastName, country, email,age, password, gender, description, matchs, disMatchs, image, google} =
      req.body

    try {
      const userExists = await User.findOne({email})
      if (userExists) {
        res.json({success: false, error: "Email already exist", response: null})
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
    const {email, password, google} = req.body
    try {
      const userExists = await User.findOne({email})
      if (!userExists) {
        res.json({
          success: true,
          error:
            "The email is incorrect, please verify that it is correctly written",
        })
      } else {
        let contraseñaCoincide = bcryptjs.compareSync(
          password,
          userExists.password
        )
        if (contraseñaCoincide) {
          const token = jwt.sign({...userExists}, process.env.SECRET_KEY)
          res.json({
            success: true,
            response: {
              token,
              email,
              image: userExists.image,
              name: userExists.name,
              admin: userExists.admin,
            },
            error: null,
          })
        } else {
          res.json({
            success: true,
            error: "The password does not match the assigned email",
          })
        }
        if (userExists.google && !google) throw new Error("Invalid email")
      }
    } catch (error) {
      res.json({success: false, response: null, error: error})
    }
  },
  
getUsers: async (req,res) => {
  
    try {
        const usersList=await User.find().populate('matchs')

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
      _id: req.user._id,
    })
  },
}

module.exports = userControllers
