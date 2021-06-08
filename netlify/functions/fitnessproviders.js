// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/fitnessproviders?activity=Boxing
exports.handler = async function(event) {

  // get the provider activity
  let activity = event.queryStringParameters.activity

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // ask Firebase for the course that corresponds to the course number, wait for the response
  let providerQuery = await db.collection('fitnessProviders').where(`activity`, `==`, activity).get()

  // turn the providerQuery into an array
  let providers = providerQuery.docs

  // create an object with the course data to hold the return value from our lambda
  let returnValue = {
    activity: activity,
    fitnessProviders: []
  }
  // loop through the providers
  for(let providerIndex = 0; providerIndex < providers.length; providerIndex++){
    // store the current provider in memory
    let fitnessProviderTemp = providers[providerIndex]

    // get the document id of the provider
    let fitnessProviderId = fitnessProviderTemp.id

    // get the data from the provider
    let providerData = fitnessProviderTemp.data()

    // create an object to be added to the return value of our lambda
    let providerObject = {
      providerName: providerData.providerName,
      fitnessProviderId: fitnessProviderId,
      activity: providerData.activity,
      address: providerData.address,
      description: providerData.description,
      level: providerData.level,
      reservations: []
    }

    //now we gotta create the array of reservation objects
    // ask Firebase for the reservations corresponding to the doc id of provider, wait for the response
    let reservationsQuery = await db.collection('reservations').where(`fitnessProviderId`, `==`, fitnessProviderId).get()

    // get the documents from the query .docs turns courseQuery into array
    let reservations = reservationsQuery.docs


    for(reservationIndex = 0; reservationIndex < reservations.length; reservationIndex++){

      //store the current reservation in memory
      let reservationTemp = reservations[reservationIndex]

      //get the document ID of the section
      let reservationId = reservationTemp.id

      //get the data from the section
      reservationData = reservationTemp.data()

      //create an object to be added to the return value
      let reservationObject = {
        providerName: "",
        time: reservationData.time,
        customerId: reservationData.customerId
      }

        //ask firebase for the provider for this reservation
        let reservationProviderQuery = await db.collection(`fitnessProviders`).doc(reservationData.fitnessProviderId).get()

        //get the data from the returned document
        let reservationProvider = reservationProviderQuery.data()

        // add the provider name from the fitness provider to the reservation object
        reservationObject.providerName = reservationProvider.providerName
      
      //add reservation object to the provider object
      providerObject.reservations.push(reservationObject)
    }
    // add the provider Object to the return value
    returnValue.fitnessProviders.push(providerObject)
  }

  // return the standard response 
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}
