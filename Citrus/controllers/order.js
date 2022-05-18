const db = require('../config/db')
const errorHandler = require('../utils/errorHandler')

module.exports.order = async (req, res) => {
    const ordersArray = db.collection('orders')
    let idOrder = 0
    let tempDate = new Date (req.body.date)
    await ordersArray.get()
        .then((data) => {
            data.forEach(d => {
                idOrder = d.id
            })
            idOrder++
            try {
                db.collection('orders').doc(idOrder.toString()).set({
                    clientName: req.body.name,
                    clientSurname: req.body.surname,
                    comments: req.body.comments,
                    date: new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), req.body.time.hour, req.body.time.minute),
                    master: req.body.master,
                    masterId: req.body.masterId,
                    phoneNumber: req.body.phoneNumber,
                    service: req.body.service,
                    isDoneByAdmin: false
                })
               
                res.status(200).json({message: true})
            } catch (error) {
                errorHandler(res, error)
            }

        })
} 