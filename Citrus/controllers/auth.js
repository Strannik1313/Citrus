const bcrypt = require('bcryptjs')
const db = require('../config/db')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')

module.exports.login = async (req, res) => {
    const candidate = await db.collection('users').get()
    const equality = candidate.docs.find(d => {
        return d.data().email == req.body.email
     })
    if (equality !== undefined) {
        const passwordResult = bcrypt.compareSync(req.body.password, equality.data().password)
        if (passwordResult) {
            const token = jwt.sign({
                email: equality.data().email
            }, config.jwt, {expiresIn: 3600})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают. Повторите попытку'
            })
        }
    } else {
        res.status(404).json({
            message: 'Пользователь с таким email не существует'
        })
    }
}

module.exports.register = async (req, res) => {
    const candidate = await db.collection('users').get()
    const equality = candidate.docs.find(d => {
       return d.data().email == req.body.email
    })
    if (equality !== undefined) {
        res.status(409).json({
            message: 'Такой email уже используется'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User(
            req.body.email,
            bcrypt.hashSync(password, salt)
        )
        try {
            await db.collection('users').doc().set(JSON.parse(JSON.stringify(user)))
            res.status(201).json(user)
        } catch (error) {
            errorHandler(res, error)
        }
    }


}