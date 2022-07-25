const db = require('../config/db')
const errorHandler = require('../utils/errorHandler')

module.exports.masters = async (req, res) => {
    const mastersArray = db.collection('masters')
    await mastersArray.get()
        .then((data) => {
            try {
                const array = []
                data.forEach(d => {
                    array.push({
                        ...d.data(),
                        services: d.data().services,
                        id: d.id
                    })
                })
                res.status(200).json(array)
            } catch (error) {
                errorHandler(res, error)
            }

        })
}

module.exports.services = async (req, res) => {
    const servicesArray = db.collection('services')
    await servicesArray.get()
        .then(collection => {
            try {
                const array = []
                collection.docs.forEach(d => {
                    array.push({
                        ...d.data(),
                        title: d.id
                    })
                })
                res.status(200).json(array)
            } catch (error) {
                errorHandler(res, error)
            }

        })
}