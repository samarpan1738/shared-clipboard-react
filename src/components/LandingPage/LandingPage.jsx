import React, { useEffect } from "react";
import "./landingPage.css";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { getApp } from "firebase/app";
const Welcome = () => {
	// * Show Firebase Auth UI & observe auth state
	const firebaseApp=getApp();
	const auth=getAuth(firebaseApp);
	const provider = new GithubAuthProvider();
	const loginWithGithub=async ()=>{
		const result = await signInWithPopup(auth, provider);
		console.log("LWG result : ",result);
	}
	useEffect(() => {
		
	}, []);
	return (
		<div class="login-container">
			<h1>Shared Clipboard</h1>
			<button onClick={loginWithGithub}>Login with github</button>
		</div>
	);
};
export default Welcome;
