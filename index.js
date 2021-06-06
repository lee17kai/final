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
      // Build the URL for our posts API
      let url = `/.netlify/functions/fitnessproviders?activity=${activity}`

      // Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // Write the json-formatted data to the console in Chrome
      console.log(json)

      // SEARCH BUTTON
      
      // CREATE RESERVATION BUTTON
      // get reference to the newly created create reservation button

      //event listener for the post comment button
      
      // CREATE USER BUTTON


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
