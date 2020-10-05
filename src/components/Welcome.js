import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import * as firebase from "firebase/app";
const Welcome = ({ auth }) => {
	// * Show Firebase Auth UI & observe auth state
	useEffect(() => {
		const ui = new firebaseui.auth.AuthUI(auth);

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
			signInSuccessUrl: "http://localhost:3000/home",

			signInOptions: [
				// List of OAuth providers supported.
				firebase.auth.GithubAuthProvider.PROVIDER_ID,
			],
		});
		// console.log(ui);
		return () => {
			ui.delete();
		};
	}, []);
	return (
		<div class="login-container">
			<h1>Shared Clipboard</h1>
			<div id="login"></div>
		</div>
	);
};
export default Welcome;
