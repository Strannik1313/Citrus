const firebase = require('../db')
const User = require('../models/User')
const firestore = firebase.firestore()

module.exports.login = (req, res) => {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
        
    })
}

module.exports.register = (req, res) => {
   
}