// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/gyms?type=Boxing
exports.handler = async function(event) {

  // get the provider name and type
  let activity = event.queryStringParameters.activity

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // ask Firebase for the course that corresponds to the course number, wait for the response
  let providerQuery = await db.collection('fitnessProviders').where(`activity`, `==`, activity).get()

  // turn the providerQuery into an array
  let providers = providerQuery.docs

  // create an object with the course data to hold the return value from our lambda
  let returnValue = {
    activity: providerData.activity,
    fitnessProviders: []
  }

  //loop through the providers
  for(let providerIndex = 0; providerIndex < providers.length; providerIndex++){

    //get the document id of the provider
    let fitnessProviderId = providers[providerIndex].id

    //get the data from the provider
    let providerData = providers[providerIndex].data()

    // create an object to be added to the return value of our lambda
    let providerObject = {
      providerName: "",
      activity: "",
      address: "",
      avgRating: "",
      description: "",
      level: "",
      reservations: [],
    }

    // add the details to the provider object
    providerObject.providerName = providerData.providerName
    providerObject.address = providerData.address
    providerObject.activity = providerData.activity
    providerObject.description = providerData.description
    providerObject.level = providerData.level

    //now we gotta create the array of reservation objects
    // ask Firebase for the sections corresponding to the Document ID of the reservation, wait for the response
    let reservationsQuery = await db.collection('reservations').where(`fitnessProviderId`, `==`, fitnessProviderId).get()

    // get the documents from the query .docs turns courseQuery into array
    let reservations = reservationsQuery.docs

    for(reservationIndex = 0; reservationIndex < reservations.length; reservationIndex++)
    
    // add the section Object to the return value
    returnValue.sections.push(providerObject)
  }

  // return the standard response 
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}
