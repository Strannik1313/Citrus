const app = require ('./app')
const config = require('./config/config')
app.listen(config.port, () => {
    console.log(`Server has been started on ${config.port}`)
})