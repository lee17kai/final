firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      console.log(user)
      
      // Build the markup for the sign-out button and set the HTML in the header
      document.querySelector(`.sign-out`).innerHTML = `
      <button class="text-blue-500 font-bold pr-8 my-reservations">My Reservations</button>
      <button class="text-blue-500 font-bold sign-out-button">Sign Out</button>`
      
      // get a reference to the my reservations button
      let myReservationsButton = document.querySelector(`.reservations`)
  
      // handle the my reservations button click
      myReservationsButton.addEventListener(`click`, function(event) {
  
      // redirect to the my restaurants page
      document.location.href = `myreservations.html`
      })
  
      // get a reference to the sign out button
      let signOutButton = document.querySelector(`.sign-out-button`)
  
      // handle the sign out button click
      signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()
  
      // redirect to the home page
      document.location.href = `index.html`
      })
  
      // Build the URL for our classes API
      let url = `/.netlify/functions/fitnessProviders`
  
      // Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)
  
      // Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()
  
      // Write the json-formatted data to the console in Chrome
      console.log(json)
  
      // Grab a reference to the element with class name "fitnessproviders" in memory
      let restaurantsDiv = document.querySelector(`.fitnessProviders`)
  
      let userUid = user.uid
      console.log(userUid)
  
          // Loop through the JSON data, for each Object representing a fitnessprovider:
          for (let i=0; i < json.length; i++) {  
      
            // Store each object ("fitnessProvider") in memory
            let fitnessProvider = json[i]
  
            // Store fitnessProvider ID
            let fitnessProviderId = fitnessProvider.fitnessProviderId
            // console.log(fitnessProviderId)
  
            let userUidArray = []
  
            console.log(restaurant.visitors.length)
  
            for (let visitorIndex=0; visitorIndex < restaurant.visitors.length; visitorIndex++) {
              // create an Object to be added to the visitor Array of the post
              let userUidCurrent = restaurant.visitors[visitorIndex].userUid
              
              // add the object to the visitor
              userUidArray.push(userUidCurrent)
            }
  
            console.log(userUidArray)
            
            if (userUidArray.includes(user.uid)) {
            // Create some markup using the post data, insert into the "posts" element
            restaurantsDiv.insertAdjacentHTML(`beforeend`,
            `<div class="md:w-1/3 p-8">
              <div class="md:mx-0 mx-4 mt-8">
                <span class="text-blue-500 font-bold text-xl">${restaurant.name}</span>
              </div>
              <div class="my-2">
                <img src="${restaurant.imageURL}" class="w-full">
              </div>
              <div class="md:mx-0 mx-4">
              <span>${restaurant.cuisine}</span>
              </div>
              <div class="md:mx-0 mx-4">
                <span>${restaurant.neighborhood}</span>
              </div>
              <div class="md:mx-0 mx-4">
              <span>${restaurant.rating}/5 Stars</span>
            </div> 
            <div id = "visited-${restaurantId}" class="text-blue-500 font-bold md:mx-0 mx-4">Visited</div> 
            </div>`)
            } else {
              restaurantsDiv.insertAdjacentHTML(`beforeend`,
              `<div class="md:w-1/3 p-8">
                <div class="md:mx-0 mx-4 mt-8">
                  <span class="text-blue-500 font-bold text-xl">${restaurant.name}</span>
                </div>
                <div class="my-2">
                  <img src="${restaurant.imageURL}" class="w-full">
                </div>
                <div class="md:mx-0 mx-4">
                <span>${restaurant.cuisine}</span>
                </div>
                <div class="md:mx-0 mx-4">
                  <span>${restaurant.neighborhood}</span>
                </div>
                <div class="md:mx-0 mx-4">
                <span>${restaurant.rating}/5 Stars</span>
              </div> 
              <button id = "visited-${restaurantId}" class="text-blue-500 font-bold md:mx-0 mx-4">Mark as Visited</button> 
              </div>`)
  
              // get a reference to the Reserve button
              let visitButton = document.querySelector(`#visited-${restaurantId}`)
  
              // event handler for the visit button
              visitButton.addEventListener(`click`, async function(event) {
              // create the URL for our visit lambda function
              let url = `/.netlify/functions/create-visit?userUid=${userUid}&restaurantId=${restaurantId}`
  
              // fetch the URL, wait for the response, store the response in memory
              let response = await fetch(url)
  
              // refresh the page
              location.reload()
        
        })
            
            }
  
        
  
        }
      
  
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'index.html'
      }
  
  
    } else {
        // user is not logged-in, so show login
        // Initializes FirebaseUI Auth
        let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
        // FirebaseUI configuration
        let authUIConfig = {
          signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
          signInSuccessUrl: `index.html` // where to go after we're done signing up/in
        }
  
        // Starts FirebaseUI Auth
        ui.start(`.sign-in`, authUIConfig)
  
  }
  })
  