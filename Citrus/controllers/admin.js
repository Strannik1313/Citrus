const db = require('../config/db')
const errorHandler = require('../utils/errorHandler')

module.exports.services = async (req, res) => {
    const servicesArray = db.collection('procedureDuration')
    await servicesArray.get()
        .then(collection => {
            try {
                const array = []
                collection.docs.forEach(d => {
                array.push(d.id)
               })
                res.status(200).json(array)
            } catch (error) {
                errorHandler(res, error)
            }

        })
} 

module.exports.master = async (req, res) => {
    const mastersArray = db.collection('masters')
    await mastersArray.get()
        .then(collection => {
            try {
                const id = collection.docs.length + 1
                mastersArray.doc(id.toString()).set({
                    name: req.body.masterName,
                    services: [...req.body.services],
                    price: [...req.body.price]
                })
                res.status(200).json({
                    message: 'Данные успешно добавлены'
                })
            } catch (error) {
                errorHandler(res, error)
            }

        })
} 