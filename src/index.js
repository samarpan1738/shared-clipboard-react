import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyAqB9TrsiXlqTUXbldj9szomHGTfSsXdFw",
	authDomain: "sharedclipboard-ec534.firebaseapp.com",
	databaseURL: "https://sharedclipboard-ec534.firebaseio.com",
	projectId: "sharedclipboard-ec534",
	storageBucket: "sharedclipboard-ec534.appspot.com",
	messagingSenderId: "427564894623",
	appId: "1:427564894623:web:2db62846eff47b541a95aa",
};
if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
