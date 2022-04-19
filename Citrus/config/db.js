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

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
<<<<<<< HEAD
const serviceAccount = require('./serviceAccount.json');
=======
const serviceAccount = require('./service-account.json');
>>>>>>> 466ea4c0195ac88dc6f1a6c7dfbb449fedba41b2

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
module.exports = db