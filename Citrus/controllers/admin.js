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
module.exports.updateOrder = async (req, res) => {
    const ordersArray = db.collection('orders')
    await ordersArray.get()
        .then(collection => {
            try {
                ordersArray.doc(req.headers.orderid).delete()
                res.status(200).json({
                    statusCode: 0,
                    message: 'Данные успешно удалены'
                })
            } catch (error) {
                errorHandler(res, error)
            }

        })
}
module.exports.completeOrder = async (req, res) => {
    const ordersArray = db.collection('orders')
    await ordersArray.get()
        .then(collection => {
            try {
                ordersArray.doc(req.body.orderId).update({
                    isDoneByAdmin: true
                })
                res.status(200).json({
                    statusCode: 0,
                    message: 'Операция прошла успешно'
                })
            } catch (error) {
                errorHandler(res, error)
            }

        })
}
module.exports.orders = async (req, res) => {
    const ordersArray = db.collection('orders')
    const startItem = Number(req.headers.startitem)
    const pageSize = Number(req.headers.pagesize)
    await ordersArray.get()
        .then(collection => {
            try {
                let array = []
                let tempArray = []
                let newCollection = []
                collection.forEach(coll => {
                    if (!coll.data().isDoneByAdmin) {
                        newCollection.push({
                            ...coll.data(),
                            orderId: coll.id
                        })
                    }

                })
                for (let i = 1; i <= newCollection.length; i++) {
                    if (i >= req.headers.startitem && i < startItem + pageSize) {
                        tempArray = newCollection[i - 1]
                        tempArray = {
                            ...tempArray,
                            date: tempArray.date.toDate(),
                            quantityOfOrders: newCollection.length
                        }
                        array.push(tempArray)
                    }
                }
                res.status(200).json(array)
            } catch (error) {
                errorHandler(res, error)
            }

        })
}

module.exports.service = async (req, res) => {
    const servicesArray = db.collection('procedureDuration')
    await servicesArray.get()
        .then(collection => {
            try {
                servicesArray.doc(req.body.service).set({
                    hour: req.body.duration.hour,
                    minute: req.body.duration.minute
                })
                res.status(200).json({
                    message: 'Данные успешно добавлены'
                })
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