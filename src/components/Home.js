import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import AddLink from "./AddLink";
import List from "./List";

const Home = ({ user, auth, authenticating, setAuthenticating }) => {
	const db = firebase.firestore();
	// const auth = firebase.auth();
	const renders = useRef(0);
	console.log("App render count -> ", renders.current++);
	function logout() {
		auth.signOut();
	}

	return (
		<div className="App">
			<div className="header-container">
				<button id="logout" onClick={logout}>
					Logout
				</button>
				<h1>
					{user.details.displayName.split(" ")[0] + "'s "}Shared Clipboard
				</h1>
			</div>
			<div className="main-content">
				<AddLink user={user} />
				<List user={user} />
			</div>
		</div>
	);
};

export default Home;
