//Nick Code
// standard event listener for Firebase auth... use instead of DOMContentLoaded
firebase.auth().onAuthStateChanged(async function(user) {
  // document.addEventListener(`DOMContentLoaded`, async function(event) {
  
    // check to see if user is logged-in (i.e. user exists)
    if (user) {
      // write the user Object to the JavaScript console
      console.log(user)
  
      // Build the markup for the sign-out button and set the HTML in the header
      document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
        <button class="text-pink-500 underline sign-out">Sign Out</button>
      `
  
      // get a reference to the sign out button
      let signOutButton = document.querySelector(`.sign-out`)
  
      // handle the sign out button click
      signOutButton.addEventListener(`click`, function(event) {
        // sign out of firebase authentication
        firebase.auth().signOut()
  
        // redirect to the home page
        document.location.href = `index.html`
      })

    // SEARCH BUTTON
      // get reference to the search fitness providers button
      let getFitnessProvidersButton = document.querySelector(`.get-fitness-providers`)

      // When the "get fitness providers" button is clicked:
      getFitnessProvidersButton.addEventListener(`click`, async function(event){

        //Ignore the default behavior of the button
        event.preventDefault()

        //get a reference to the element containing the user-entered activity
        let activityInput = document.querySelector(`#activity`)

        //get the user-entered location and days from the element's value
        let activity = activityInput.value

        //Check to see if the user entered anything; if so:
        if(activity.length > 0){

          // construct the url to call the API
          let url = `/.netlify/functions/fitnessproviders?activity=${activity}`

          // - Fetch the url, wait for a response, store the response in memory
          let response = await fetch(url)

          // - Ask for the json-formatted data from the response, wait for the data, store it in memory
          let json = await response.json()       

          // get a reference to the discover element
          let searchResultsElement = document.querySelector(`.search-results`)

          //Use the given formatting and plug in the header
          searchResultsElement.innerHTML = `
          <div class="text-center space-y-8">
            <div class="font-bold text-3xl">Search results for "${activity}"</div>
          </div>`
          
          //store the interpreted fitness providers array
          let providerResults = json.fitnessProviders

          //Loop through the found fitness providers
          for(let providerIndex = 0; providerIndex < providerResults.length; providerIndex++){
            // Create variable to store each provider in memory
            let tempProvider = providerResults[providerIndex]
            
            //Now add in the list formatting and plug in values etc.
            searchResultsElement.insertAdjacentHTML(`beforeend`, 
            `<div class="text-center space-y-8">
              <div>
                <h1 class="text-2xl text-bold text-gray-700">${tempProvider.providerName}</h1>
                <p class="text-gray-500">${tempProvider.address}</p>
                <p class="text-gray-500">${tempProvider.description}</p>
                <p class="text-gray-500">${tempProvider.level}</p>
              </div>
            </div>`
            )



            // **Start new stuff**

            // actual Reserve button (html)
            searchResultsElement.insertAdjacentHTML(`beforeend`,
            `<div class="dropdown text-center">
            <form>
              <input list="timeOptions" type="text" name="times" id="times" placeholder="Select a time" class="border border-gray-400 rounded p-2 mr-1">
              <datalist id="timeOptions">
                <option value="5:00 AM - 6:00 AM">
                <option value="6:00 AM - 7:00 AM">
                <option value="7:00 AM - 8:00 AM">
                <option value="6:00 PM - 7:00 PM">
                <option value="7:00 PM - 8:00 PM">
                <option value="8:00 PM - 9:00 PM">
              </datalist>
              <button class="get-reserve border bg-green-500 text-white rounded px-4 py-2">Reserve?</button>
            </form>
            </div>`
            )

            // Reserve button input
              // get reference to the search fitness providers button
             let getReserveButton = document.querySelector(`.get-reserve`)

              // When the "get fitness providers" button is clicked:
              getReserveButton.addEventListener(`click`, async function(event){

                //Ignore the default behavior of the button
                event.preventDefault()
                //get a reference to the element containing the user-entered info for "Reserve? button"
                let reservationInput = document.querySelector(`#times`)
                //get the element's value
                let reservationValue = reservationInput.value

                //get the current fitness provider Id
                let fitnessProviderValue = tempProvider.fitnessProviderId
                console.log(fitnessProviderValue)

                //get current customer id
                let customerIdValue = firebase.auth().currentUser.uid  
                
                //Build the URL for our reservations API
                let url = `/.netlify/functions/create_reservation?time=${reservationValue}&customerId=${customerIdValue}&fitnessProviderId=${fitnessProviderValue}`
                
                // Fetch the url, wait for a response, store the response in memory. 
                let response = fetch(url)

                // refresh the page
                location.reload()                      

             })

             // **End new stuff**





          //the For loop "}"
          }
        //the If "}" 
        }
      //the eventListener "})" 
      })

    } else {
      // user is not logged-in, so show login
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: `main.html` // where to go after we're done signing up/in
      }
  
      // Starts FirebaseUI Auth
      ui.start(`.sign-in-or-sign-out`, authUIConfig)
    }
  })


//Kai Code
// firebase.auth().onAuthStateChanged(async function(user) {
//   if (user) {
//     // Signed in
//     console.log('signed in')
//   } else {
//     // Signed out
//     console.log('signed out')

//     // Initializes FirebaseUI Auth
//     let ui = new firebaseui.auth.AuthUI(firebase.auth())

//     // FirebaseUI configuration
//     let authUIConfig = {
//       signInOptions: [
//         firebase.auth.EmailAuthProvider.PROVIDER_ID
//       ],
//       signInSuccessUrl: 'index.html'
//     }

//     // Starts FirebaseUI Auth
//     ui.start('.sign-in-or-sign-out', authUIConfig)
//   }
// })
