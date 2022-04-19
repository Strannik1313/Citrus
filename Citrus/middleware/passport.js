const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../config/db')
const config = require('../config/config')
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt
}
module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (payload, done) => {
        try {
            const candidate = await db.collection('users').get()
            const equality = candidate.docs.find(d => {
                return d.data().email == payload.email
            })
            if (equality!== undefined) {
                done(null, equality)
            } else {
                done(null, false)
            } 
        } catch (error) {
            console.log(error)
        }
        
    }))
}
