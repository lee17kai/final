// Goal: Provide a function to create a new user in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let currentUser = firebase.auth().currentUser
  let userEmail = currentUser.email
  let userName = currentUser.name

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new user, wait for it to return
  let newUser = await db.collection('users').add({
    userEmail: userEmail,
    userName: userName
  })

  return {
    statusCode: 200
  }
}