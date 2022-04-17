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
    APP_ID
} = process.env

assert(PORT, 'PORT is reuired')
assert(HOST, 'HOST is required')

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        api_key: API_KEY,
        auth_domain: AUTH_DOMAIN,
        project_id: PROJECT_ID,
        storage_bucket: STORAGE_BUCKET,
        messaging_sender_id: MESSAGING_SENDER_ID,
        app_id: APP_ID
    }
}