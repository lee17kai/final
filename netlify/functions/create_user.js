// Goal: Provide a function to create a new user in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let userEmail = event.queryStringParameters.userEmail
  let userName = event.queryStringParameters.userName
  let userPassword = event.queryStringParameters.userPassword

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new reservation, wait for it to return
  let newUser = await db.collection('users').add({
    userEmail: userEmail,
    userName: userName,
    userPassword: userPassword
  })


  return {
    statusCode: 200
  }
}