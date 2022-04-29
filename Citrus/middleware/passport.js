const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const errorHandler = require('../utils/errorHandler')
const db = require('../config/db')
const config = require('../config/config')
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt
}
module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (payload, done) => {
        try {
            await db.collection('authorizedClients').get()
                .then(collection => {
                    const candidate = collection.docs.find(d => {
                        return d.data().email == payload.email
                    })
                    if (candidate !== undefined) {
                        done(null, candidate.data())
                    } else {
                        done(null, false)
                    }
                })
        } catch (error) {
            errorHandler(res, error)
        }
    }))
}
