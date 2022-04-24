const db = require('../config/db')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')

module.exports.personal = async (req, res) => {
    const client = db.collection('authorizedClients').doc(req.user.id.toString())
    await client.get()
        .then(() => {
            try {
                client.update({
                    phoneNumber: req.body.phoneNumber,
                    name: req.body.name,
                    surname: req.body.surname
                })
                res.status(200).json({
                    message: 'Данные успешно добавлены'
                })
            } catch (error) {
                errorHandler(res, error)
            }

        })
}