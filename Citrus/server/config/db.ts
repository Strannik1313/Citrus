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
// import { createRequire } from 'module';
import serviceAccount from '../config/service-account.json' assert { type: 'json' };
// const require = createRequire(import.meta.url);
// const serviceAccount = require('./service-account.json');

initializeApp({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	credential: cert(serviceAccount),
});

export const db = getFirestore();
