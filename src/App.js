import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/firestore";
import AddLink from "./AddLink";
import List from "./List";

const App = () => {
	const db = firebase.firestore();
	const renders = useRef(0);
	console.log("App render count -> ", renders.current++);
	return (
		<div className="App">
			<h1>Shared Clipboard</h1>
			<AddLink db={db} />
			<List db={db} />
		</div>
	);
};

export default App;
