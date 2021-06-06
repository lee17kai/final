// Goal: Provide a function to create a new reservation in Firebase
// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let userName = event.queryStringParameters.userName
  let fitnessProvider = event.queryStringParameters.fitnessProvider
  let reservationId = event.queryStringParameters.reservationId

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new post, wait for it to return
  await db.collection('reservations').add({
    customerId: userName,
    fitnessProviderId: ,
    time: ,
  })
  return {
    statusCode: 200
  }
}