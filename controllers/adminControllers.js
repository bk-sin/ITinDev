const User = require("../models/user")

const adminControllers={

    deleteUser:(req,res) =>{
        User.findOne({_id: req.params.id})
        .then((user) =>{
               User.findOneAndUpdate({_id:req.params.id}, {$pull:{_id:req.user.id}},{new:true})
               .then((user)=> res.json({success:true, response:user}))
               .catch((error) => console.log(error))
        })
        .catch((error) => res.json({success:false, response:error}))
    },
    assignAdminAndDeletedAdmin:(req,res) =>{
        User.findOne({_id: req.params.id})
        .then((user) =>{
            if(req.user._id===" "){
            if(user.admin===true){
               User.findOneAndUpdate({_id:req.params.id}, {$set:{admin:false}},{new:true})
               .then((user)=> res.json({success:true, response:user.admin}))
               .catch((error) => console.log(error))
            }else{
                User.findOneAndUpdate({_id: req.params.id}, {$set:{admin:true}},{new:true})
                .then((user) => res.json({success:true, response:user.admin}))
                .catch((error) => console.log(error))
            }}
        })
        .catch((error) => res.json({success:false, response:error}))
    },
    setBan:(req,res) =>{
        User.findOne({_id: req.params.id})
        .then((user) =>{
            if(user.banned===false){
               User.findOneAndUpdate({_id:req.params.id}, {$set:{banned:false}},{new:true})
               .then((user)=> res.json({success:true, response:user.banned}))
               .catch((error) => console.log(error))
            }else{
                User.findOneAndUpdate({_id: req.params.id}, {$set:{banned:true}},{new:true})
                .then((user) => res.json({success:true, response:user.banned}))
                .catch((error) => console.log(error))
            }
        })
        .catch((error) => res.json({success:false, response:error}))
    },

}
module.exports =adminControllers