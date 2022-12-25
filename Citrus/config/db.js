// const firebase = require('firebase')
// const config = require('./config')

// firebase.initializeApp(config.firebaseConfig)
// const db = firebase.firestore()

// module.exports = db

// const initializeApp = require('firebase/app')
// const getFirestore = require('firebase/firestore/lite')
// const config = require('./config')
// const app = initializeApp(config.firebaseConfig)
// const db = getFirestore(app)
// module.exports = db

// const admin = require("firebase-admin");

// const serviceAccount = require("./service-account.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// module.exports = admin

import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./service-account.json');

initializeApp({
	credential: cert(serviceAccount),
});

const db = getFirestore();
export default db;
