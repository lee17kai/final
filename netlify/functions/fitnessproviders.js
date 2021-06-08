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
        time: reservationData.time.toDate().toString(),
        customerList: []
      }

        //ask firebase for the provider for this reservation
        let reservationProviderQuery = await db.collection(`fitnessProviders`).doc(reservationData.fitnessProviderId).get()

        //get the data from the returned document
        let reservationProvider = reservationProviderQuery.data()

        // add the provider name from the fitness provider to the reservation object
        reservationObject.providerName = reservationProvider.providerName

        //ok now another loop for the customers array within each reservation!
        // ask Firebase for the list of reservations that match our current provider and current reservation time
        let reservationTimeQuery = await db.collection('reservations').where(`fitnessProviderId`, `==`, fitnessProviderId).where(`time`, `==`, reservationData.time).get()

        // turn this query into an array of reservations that represents a list of customers that signed up for each rservation
        let customers = reservationTimeQuery.docs

        //loop through this array, turning the array of reservations into an array of customer objects
        for(customerIndex = 0; customerIndex < customers.length; customerIndex++){
          //store current reservation in memory
          let reservationTemp2 = customers[customerIndex]
          //get document ID of the reservation
          let reservationId2 = reservationTemp2.id

          // get the data for this reservation
          let reservationData2 = reservationTemp2.data()

          // get the customer data for this reservation
          let customerId = reservationData2.customerId

          //ask firebase to go through the users and find the customer 
          let customersQuery = await db.collection(`users`).doc(customerId).get()

          // get first document from this array
          let customerData = customersQuery.data()

          // create a customer object
          let customerObject = {
            name: customerData.userName,
            email: customerData.userEmail,
          }

          //add customer object to the reservation object
          reservationObject.customerList.push(customerObject)
        }
      

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
