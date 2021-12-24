const passport = require("passport")
const jwtStrategy = require("passport-jwt").Strategy
const extractJwt = require("passport-jwt").ExtractJwt
const User = require("../models/Persona")

module.exports = passport.use(
    new jwtStrategy(
        {
            jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), 
            secretOrKey: process.env.SECRET_KEY,
        },
        (payload, done) => {
        User.findOne({_id: payload._doc._id})
            .then(response => {
                if (!response){
                    return done(null, false)
                } else {
                    return done(null, response)
                }
            })
            .catch(error => done(error, false)) 
}))