const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const bodyParser = require('body-parser')
const AuthRoutes = require('./routes/auth')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/auth', AuthRoutes)

module.exports = app