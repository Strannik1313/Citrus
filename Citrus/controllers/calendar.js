const db = require('../config/db')
const errorHandler = require('../utils/errorHandler')
const dayjs = require('dayjs')
dayjs().format()
var dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)

module.exports.calendar = async (req, res) => {
    const mastersIdArray = [];
    const mastersArray = [];
    const dateArray = [];
    const freeTimesArray = [];
    const mastersCollection = db.collection('masters');
    const datesCollection = db.collection('calendar');
    await mastersCollection.where('serviceId', 'array-contains', req.body.serviceId).get()
        .then((data) => {
            try {
                data.forEach(master => {
                    if (req.body.masterId === master.data().masterId || req.body.masterId === -1) {
                        mastersIdArray.push(master.data().masterId);
                        mastersArray.push({ ...master.data(), masterId: master.id });
                    }
                })
            } catch (error) {
                errorHandler(res, error)
            }
        })
    await datesCollection.where('masterId', 'in', mastersIdArray).get()
        .then((data) => {
            try {
                data.forEach(masterTimes => {
                    for (let i = 0; i < masterTimes.data().freeTimes.length; i++) {
                        dateArray.push(masterTimes.data().freeTimes[i].toDate());
                    }
                })
                dateArray.sort((a, b) => {
                    return a - b;
                })
                let firstDay = dayjs(req.body.date).isBefore(dateArray[0]) ? dateArray[0] : req.body.date
                dateArray.forEach(date => {
                    if (dayjs(firstDay).dayOfYear() === dayjs(date).dayOfYear()) {
                        freeTimesArray.push(date);
                    }
                })
                const filteredArray = dateArray.filter((value, index, array) => {
                    if (value.getMonth() >= req.body.month) {
                        if (index !== 0) {
                            return value.getDate() !== array[index - 1].getDate();
                        }
                        return true
                    }
                    return false
                })
                res.status(200).json({
                    filteredDates: [...filteredArray.slice(0, 7)],
                    masters: [...mastersArray],
                    freeTimes: [...freeTimesArray],
                })
            } catch (error) {
                errorHandler(res, error)
            }
        })
}
