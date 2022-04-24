const db = require('../config/db')
const errorHandler = require('../utils/errorHandler')

module.exports.calendar = async (req, res) => {
   
    const tempArray = []
    const tempTimesArray = []
    const mastersArray = db.collection('masters')
    const timesArray = db.collection('calendar')
    const orderTimesArray = db.collection('orders')
    const procedure = db.collection('procedureDuration')
    const date = new Date(2022, req.body.month, req.body.day, 3)
    await mastersArray.get()
        .then(data => {
            try {
                data.forEach(d => {
                    if (req.body.masterId == 0) {
                        tempArray.push({
                            masterName: d.data().name,
                            masterId: d.id
                        })
                    } else {
                        if (req.body.masterId == d.id) {
                            tempArray.push({
                                masterName: d.data().name,
                                masterId: d.id
                            })
                        }
                    }

                })
            } catch (error) {
                errorHandler(res, error)
            }
        })

    await orderTimesArray.get()
        .then(data => {
            try {
                data.forEach(d => {
                    if (date.getMonth() == d.data().date.toDate().getMonth() && date.getDate() == d.data().date.toDate().getDate()) {
                        if (req.body.masterId == 0) {
                            tempTimesArray.push({
                                date: d.data().date,
                                masterId: d.data().masterId
                            })
                        } else {
                            if (d.data().masterId == req.body.masterId) {
                                tempTimesArray.push({
                                    date: d.data().date,
                                    masterId: d.data().masterId
                                })
                            }
                        }
                    }
                })
            } catch (error) {
                errorHandler(res, error)
            }
        })
    await timesArray.get()
        .then(data => {
            try {
                let i = 0
                data.forEach(d => {
                    if (req.body.masterId == 0) {
                        tempArray[i].arrayOfFreeTimes = []
                        for (y = 0; y < d.data().freeTimes.length; y++) {
                            if (date.getMonth() == d.data().freeTimes[y].toDate().getMonth() && date.getDate() == d.data().freeTimes[y].toDate().getDate()) {
                                tempArray[i].arrayOfFreeTimes.push(d.data().freeTimes[y].toDate().getHours())
                            }
                        }
                    } else {
                        if (d.id == tempArray[0].masterName) {
                            tempArray[0].arrayOfFreeTimes = []
                            for (y = 0; y < d.data().freeTimes.length; y++) {
                                if (date.getMonth() == d.data().freeTimes[y].toDate().getMonth() && date.getDate() == d.data().freeTimes[y].toDate().getDate()) {
                                    tempArray[0].arrayOfFreeTimes.push(d.data().freeTimes[y].toDate().getHours())
                                }
                            }
                        }
                    }
                    i++
                })
                
            } catch (error) {
                errorHandler(res, error)
            }
        })
    await procedure.get()
        .then(data => {
            try {
                for (i = 0; i < tempArray.length; i++) {
                    tempArray[i].procedureDuration = []
                    data.forEach(d => {
                        if (req.body.procedure == d.id.toString()) {
                            tempArray[i].procedureDuration = ({
                                hour: d.data().hour,
                                minute: d.data().minute
                            })
                        }
                    })
                }
                for (i = 0; i < tempArray.length; i++) {
                    finalArray = tempArray.filter(m => {
                        return m.arrayOfFreeTimes[0] !== undefined
                    })
                }
                if (finalArray.length == 0) {
                    res.status(404).json('В этот день нет свободных мест')
                } else {
                    res.status(200).json(finalArray)
                }
                console.log(finalArray)
            } catch (error) {
                errorHandler(res, error)
            }
        })


    // const mastersArray = db.collection('masters')
    // await mastersArray.get()
    //     .then((data) => {
    //         try {

    //             // const array = []
    //             // data.forEach(d => {
    //             //     array.push({
    //             //         ...d.data(),
    //             //         services: d.data().services,
    //             //         id: d.id
    //             //     })
    //             // })
    //             res.status(200).json(array)
    //         } catch (error) {
    //             errorHandler(res, error)
    //         }

    //     })
} 