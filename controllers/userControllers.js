const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer=require('nodemailer') //NPM NODEMAILER
const crypto = require('crypto')   //NPM CRYPTO


const sendEmail = async(email , uniqueString) =>{

  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    success:true,
    auth:{
      user:"useramailverifyMindHub@gmail.com",
      pass:"mindhub2021"
    }

  })
  let sender= "useramailverifyMindHub@gmail.com"
  let mailOptions = {
    from:sender,
    to:email,
    subject:"Verificacion de email usuario",
    html: `Bienvenidos a ItnDev para confirmar su email presione <a href=http://localhost:4000/api/verify/${uniqueString}>aqui</a> Muchas Gracias`

  };
  await transporter.sendEmail(mailOptions, function(error , response){
    if(error){console.log(error)}
    else{console.log("Mensaje Enviado")}

  })
} ,

const userControllers = {

  verifyEmail:async(req,res) => {
    const {uniqueString}= req.params;

    const user  = await User.findOne({uniqueString:uniqueString})
    if (user){
      user.emailVerified = true 
      await user.save()
      res.redirect("http://localhost:3000/")
    }
    else {res.json({success:false,response:"Su Email no se ha  verificado "})}
  },

  newUser: async (req, res) => {
    let {name, lastName, country, email, age, password, gender, image, google} =
      req.body

    try {
      const userExists = await User.findOne({email})
      if (userExists) {
        if(google){
          const contraseñaHasheada = bcryptjs.hashSync(password,10)
          userExists.password=contraseñaHasheada;
          userExists.emailVerified=true
          userExists.google=true
          userExists.save()
          res.json({success: true, response: "Actualizamos tu signin para que lo puedas realizar correctamente",})
        }else{
          res.json({success: false, error: "El Email ya esta en uso", response: null})
          
        }
       } else {
         //Si el usuario no existe  instalar Crypto y nomaailer
         var uniqueString = crypto.randomBytes(15).toString('hex')

         let emailVerified = false

         const contraseñaHasheada = bcryptjs.hashSync(password,10)
        
        const newUser = new User({
          name,
          lastName,
          country,
          email,
          age,
          password,
          gender,
          image,
          google,
          uniqueString,
          emailVerified,
          password:contraseñaHasheada



        })

        const token = jwt.sign({...newUser}, process.env.SECRET_KEY)
        if(google){
          emailVerified = true;
          newUser.google = true;
          await newUser.save()
          res.json({success:true, response:{token,newUser,image}, Message:"Felicitaciones se a creado tu usuaurio con Google"})

        }else{
          emailVerified=false
          newUser.google=false
          await newUser.save()
          await sendEmail (email,uniqueString)
          res.json({success:true , response:{token,newUser,image} , message:"Te enviamos un mail para validarlo , por favor verifica tu casilla de correo electronico "})
        }
        // res.json({
        //   success: true,
        //   response: {token, newUser, image},
        //   error: null,
        // })
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
          success: false,
          error:
            "El usuario y/o contraseña son incorrectos",
        })
      }else{
        if(userExists.emailVerified){ 
        let contraseñaCoincide = bcryptjs.compareSync(password, userExists.password)
       
        if (contraseñaCoincide) { 
            const token = jwt.sign({...userExists}, process.env.SECRET_KEY)
            userData={
                firstName:userExists.firstName,
                lastName:userExists.lastName,
                email:userExists.email,
               

            }
            userExists.isConected = true 
            await userExists.save()
            
            res.json({success:true, response:{token, userData} ,error:null})
           
            
        }else{
            if(!userExists.google && google){
                return res.json({success: false, error:"No te registraste con Google, por favor has el SigUp con tu cuenta Google, si quieres acceder con ella"})}
            if(userExists.google && !google){
                 return res.json({success: false, error:"Te registraste con Google, por favor has el SigIN con tu cuenta Google, si quieres acceder con ella"})}
            
            else{
                return res.json({success: false, error:"El usuario y/o contraseña incorrectos"})}

        }
    }else{res.json({success:false, error:'Hola verifica tu email para validarlo'})} 
    }

}catch(error){
    console.log(error);
    res.json({success: false, response: null, error: error})
}
},

  getUsers: async (req, res) => {
    try {
      const usersList = await User.find()

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
  verifyEmail: async(req,res) => {
    const {uniqueString} = req.params;

    const user = await User.findOne({uniqueString:uniqueString})
    if(user){
      user.emailVerified= true
      await user.save()
      res.redirect("http://localhost3000/")
    }
    else{res.json({success:false,response:"Su Email no se ha verificado"})}
  }
}


module.exports = userControllers
