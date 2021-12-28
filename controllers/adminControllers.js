const User = require("../models/user")

const adminControllers={

     matchsAndDismatchs:(req,res) =>{
        User.findOne({_id: req.params.id})
        .then((user) =>{
               User.findOneAndUpdate({_id:req.params.id}, {$pull:{_id:req.params.id}},{new:true})
               .then((user)=> res.json({success:true, response:user}))
               .catch((error) => console.log(error))
        })
        .catch((error) => res.json({success:false, response:error}))
    },

}
module.exports =adminControllers