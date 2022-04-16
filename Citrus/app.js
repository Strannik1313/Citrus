const express = require('express')
const AuthRoutes = require('./routes/auth')
const app = express()

app.use('/api/auth', AuthRoutes)

module.exports = app