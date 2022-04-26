const db = require('../config/db')
const errorHandler = require('../utils/errorHandler')

module.exports.disabled = async (req, res) => {

    req.body.service
    req.body.masterId

    const mastersArray = db.collection('calendar')
    await mastersArray.get()
        .then((data) => {
            try {
                const array = []
                let i = 0
                data.forEach(d => {
                    let lastMonth = 0
                    let lastDay = 0
                    let firstMonth = 12
                    let firstDay = 32
                    for (y = 0; y < d.data().freeTimes.length; y++) {
                        if (d.data().freeTimes[y].toDate().getMonth() > lastMonth) {
                            array[i] = {
                                ...array[i],
                                masterId: d.id,
                                lastMonth: d.data().freeTimes[y].toDate().getMonth()
                            }
                            lastMonth = d.data().freeTimes[y].toDate().getMonth()
                        }
                        if (d.data().freeTimes[y].toDate().getMonth() < firstMonth) {
                            array[i] = {
                                ...array[i],
                                firstMonth: d.data().freeTimes[y].toDate().getMonth()
                            }
                            firstMonth = d.data().freeTimes[y].toDate().getMonth()
                        }
                    }
                    
                    for (y = 0; y < d.data().freeTimes.length; y++) {
                        if (d.data().freeTimes[y].toDate().getDate() > lastDay && d.data().freeTimes[y].toDate().getMonth() == lastMonth) {
                            array[i] = {
                                ...array[i],
                                lastDay: d.data().freeTimes[y].toDate().getDate()
                            }
                            lastDay = d.data().freeTimes[y].toDate().getDate()
                        }

                        if (d.data().freeTimes[y].toDate().getDate() < firstDay && d.data().freeTimes[y].toDate().getMonth() == firstMonth) {
                            array[i] = {
                                ...array[i],
                                firstDay: d.data().freeTimes[y].toDate().getDate()
                            }
                            firstDay = d.data().freeTimes[y].toDate().getDate()
                        }
                    }
                    i++
                })
                res.status(200).json(array)
            } catch (error) {
                errorHandler(res, error)
            }

        })
} 