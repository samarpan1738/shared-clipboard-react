import React, { useEffect, useState } from "react";
import "./App.css";
import {getApp} from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import Welcome from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import NoteEditor from "./components/NoteEditor"
const App = () => {
	const firebaseApp=getApp();
	const auth = getAuth(firebaseApp);
	// State
	const [user, setUser] = useState({ loggedIn: false, details: {} ,authStatus:"LOGGED_OUT"});
	const [authenticating, setAuthenticating] = useState(true);

	// const renders = useRef(0);
	// console.log("App render count -> ", renders.current++);
	// console.log("Authenticating --> ", authenticating, " ", renders.current);

	// * Observe auth state
	useEffect(() => {
		// * Authentication State Observer
		onAuthStateChanged(auth,(u) => {
			setAuthenticating(true);
			console.log("Auth started ");
			if (u) {
				// User is signed in.
				// {email ,emailVerified ,photoURL ,isAnonymous ,uid ,providerData } = u
				const displayName = u.displayName;
				// setAuthenticating(false);
				setUser({
					loggedIn: true,
					details: {
						uid: u.uid,
						email: u.email,
						displayName: u.displayName,
					},
				});
				setAuthenticating(false);
				console.log(`${displayName} logged in!!`);
			} else {
				// User is signed out.
				setUser({ loggedIn: false, details: {} });
				console.log("User signed out");
				setAuthenticating(false);
			}
			console.log("Auth ended");
		});
	}, []);
	

	return (
		<div className="App">
			<Router>
				<Switch>
					{authenticating &&
						(<div className="progress loader">
							<div className="indeterminate"></div>
						</div>)
					}

					<Route exact path="/">
						{!user.loggedIn ? <Welcome auth={auth} /> : <Redirect to="/home" />}
					</Route>

					<Route exact path="/home">
						{!user.loggedIn ? (
							<Redirect to="/" />
						) : (
							<Home
								user={user}
								auth={auth}
								authenticating={authenticating}
								setAuthenticating={setAuthenticating}
							/>
						)}
					</Route>
					<Route exact path="/edit">
						{!user.loggedIn ? <Welcome auth={auth} /> : <NoteEditor/>}
					</Route>
				</Switch>
			</Router>

			{/* {!user.loggedIn ? (
				<Welcome auth={auth} />
			) : (
				<Home
					user={user}
					auth={auth}
					authenticating={authenticating}
					setAuthenticating={setAuthenticating}
				/>
			)} */}
		</div>
	);
};
const App2=()=>{
return <>
<h1>Snowpack</h1>
</>
}
export default App;
