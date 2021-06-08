// Goal: Provide a function to create a new reservation in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let time = event.queryStringParameters.time
  let customerId = event.queryStringParameters.customerId
  let fitnessProviderId = event.queryStringParameters.fitnessProviderId

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new reservation, wait for it to return
  let newReservation = await db.collection('reservations').add({
    customerId: customerId,
    fitnessProviderId: fitnessProviderId,
    time: time
  })

  return {
    statusCode: 200
  }
}