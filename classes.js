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
  
      // redirect to the my reservations page
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
  
            //stuck...

        
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
  