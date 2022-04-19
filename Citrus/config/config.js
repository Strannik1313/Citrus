const dotenv = require('dotenv')
const assert = require('assert')

dotenv.config()

const {
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    JWT
} = process.env

assert(PORT, 'PORT is required')
assert(HOST, 'HOST is required')

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
<<<<<<< HEAD:Citrus/config/config.js
=======
    firebaseConfig: {
        api_key: API_KEY,
        auth_domain: AUTH_DOMAIN,
        project_id: PROJECT_ID,
        storage_bucket: STORAGE_BUCKET,
        messaging_sender_id: MESSAGING_SENDER_ID,
        app_id: APP_ID
    },
>>>>>>> 466ea4c0195ac88dc6f1a6c7dfbb449fedba41b2:Citrus/config.js
    jwt: JWT
}