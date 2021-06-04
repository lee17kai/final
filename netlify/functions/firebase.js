const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
//Group firebase info
apiKey: "AIzaSyC2fn9VA6Y1Bfplu43HUNDb6lV1cUq5AuU",
authDomain: "final-49027.firebaseapp.com",
projectId: "final-49027",
storageBucket: "final-49027.appspot.com",
messagingSenderId: "33461789910",
appId: "1:33461789910:web:bd4b77badbe7a2aa3b9577"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase