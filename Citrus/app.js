const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const bodyParser = require('body-parser')
const AuthRoutes = require('./routes/auth')
const CalendarRoutes = require('./routes/calendar')
const AdminRoutes = require('./routes/admin')
const PersonalRoutes = require('./routes/personal')
const OrderRoutes = require('./routes/order')
const MastersRoutes = require('./routes/masters')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/auth', AuthRoutes)
app.use('/api/admin', AdminRoutes)
app.use('/api', PersonalRoutes)
app.use('/api', OrderRoutes)
app.use('/api', CalendarRoutes)
app.use('/api', MastersRoutes)
app.use(passport.initialize())

require('./middleware/passport')(passport)

module.exports = app