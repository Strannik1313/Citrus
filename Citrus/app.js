const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')

const bodyParser = require('body-parser')
const AuthRoutes = require('./routes/auth')
const TestRoutes = require('./routes/test')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/auth', AuthRoutes)
app.use('/api/test', TestRoutes)
app.use(passport.initialize())

require('./middleware/passport')(passport)

module.exports = app