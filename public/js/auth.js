
function toLogin() {
  console.log("lol sorry");
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
  	// This gives you a Google Access Token. You can use it to access the Google API.
  	var token = result.credential.accessToken;
  	// The signed-in user info.
  	var user = result.user;
  	// ...
	}).catch(function(error) {
  // Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  // The email of the user's account used.
  	var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  	var credential = error.credential;
	});
}

Pinder.prototype.onAuthStateChanged = function(user) {
  console.log(user);
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL;
    var userName = user.displayName;
	}
}

