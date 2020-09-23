import React,{useEffect} from "react";
import * as firebaseui from "firebaseui";
import * as firebase from "firebase/app";
const Logout = () => {
	// * Show Firebase Auth UI & observe auth state
	useEffect(() => {
		const ui = new firebaseui.auth.AuthUI(firebase.auth());

		// * Show Firebase UI
		ui.start("#login", {
			callbacks: {
				signInSuccessWithAuthResult: function (authResult, redirectUrl) {
					// User successfully signed in.
					// Return type determines whether we continue the redirect automatically
					// or whether we leave that to developer to handle.
					// return true;
					console.log({ authResult, redirectUrl });
					// return true;
				},
				uiShown: function () {
					// document.getElementById("loader").style.display = "none";
				},
			},
			// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
			signInFlow: "popup",
			signInSuccessUrl: "http://localhost:3000",

			signInOptions: [
				// List of OAuth providers supported.
				firebase.auth.GithubAuthProvider.PROVIDER_ID,
			],
		});
	}, []);
	return <div id="login"></div>;
};
export default Logout;
