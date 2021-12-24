const joi = require('joi')

const validator = (req, res, next) => {

    const schema = joi.object({
        name: joi.string().trim().min(2).max(15).required().pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.empty": "Your Name is a required field",
            "string.min": "Your Name must have at least 2 characters",
            "string.max": "Your Name could have max. 15 characters",
            "string.pattern.base": "Your Name must contain only letters",
        }),
        lastName: joi.string().trim().min(2).max(15).required().pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.empty": "Your Last Name is a required field",
            "string.min": "Your Last Name must have at least 3 characters",
            "string.max": "Your Last Name could have max. 15 characters",
            "string.pattern.base": "Your Last Name must contain only letters",
        }),
        country: joi.string().trim().min(2).max(15).required().pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.empty": "Your coutry is a required field",
    
        }),
        email: joi.string().required().trim().email({tlds:{allow:false}}).messages({
            "any.required": "Your Email is a required field",
            "string.email": "Your Email must be a valid mail",
        }),
        password:joi.string().min(4).trim().required().messages({
            "string.empty": "Your Password  is a required field",
            "string.min": "Your Password  must have at least 4 characters",
        }),
        urlImage:joi.string().required().trim().messages({
            "string.empty": "Your must insert an image URL link ",
        }),
        google:joi.boolean(),
    })

    const validation = schema.validate(req.body, {abortEarly:false})

    if (validation.error) {
        console.log(validation.error)
        return res.json({success: false, errores:validation.error.details})
    }
    
    next()
    
    
}

module.exports = validator