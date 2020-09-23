import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import AddLink from "./AddLink";
import List from "./List";
import Logout from "./Logout";
import LoggedIn from "./LoggedIn";

const App = () => {
	const db = firebase.firestore();
	const [user, setUser] = useState({ loggedIn: false, details: {} });
	// * Show Firebase Auth UI & observe auth state
	useEffect(() => {
		// * 2. Authentication State Observer
		firebase.auth().onAuthStateChanged((u) => {
			if (u) {
				// User is signed in.
				// {email ,emailVerified ,photoURL ,isAnonymous ,uid ,providerData } = u
				const displayName = u.displayName;
				db.collection("users").doc(u.uid).set({ links: [] }, { merge: true });

				setUser({
					loggedIn: true,
					details: { uid: u.uid, email: u.email, displayName: u.displayName },
				});
				console.log(`${displayName} logged in!!`);
			} else {
				// User is signed out.
				setUser({ loggedIn: false, details: {} });
				console.log("User signed out");
			}
		});
	}, []);

	const renders = useRef(0);
	console.log("App render count -> ", renders.current++);

	return (
		<div className="App">
			{!user.loggedIn ? <Logout /> : ""}
			<h1>
				{user.loggedIn ? user.details.displayName.split(" ")[0] + "'s " : ""}
				Shared Clipboard
			</h1>
			<AddLink db={db} user={user} />
			<List db={db} user={user} />
		</div>
	);
};

export default App;
