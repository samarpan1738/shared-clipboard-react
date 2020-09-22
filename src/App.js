import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/firestore";
import AddLink from "./AddLink";
import ListItem from "./ListItem";

const App = () => {
	const db = firebase.firestore();
	const [docs, setDocs] = useState({ content: {}, loaded: false });

	// const renders = useRef(0);
	// const frameCnt = useRef(0);
	// const tempState = useRef({});
	useEffect(() => {
		if (!docs.loaded) {
			// * collection.get returns a promise
			db.collection("boards").onSnapshot((snapshot) => {
				setDocs((oldState) => {
					// * Change the state
					let temp = { content: { ...oldState.content }, loaded: true };
					snapshot.docChanges().forEach((change) => {
						// console.log("I run on delete");
						if (change.type === "removed") delete temp.content[change.doc.id];
						// console.log(doc.id);
						else temp.content[change.doc.id] = change.doc.data();
						// console.log(change.doc);
					});
					return temp;
				});
			});
		}
	}, []);
	// tempState.current = docs;
	// console.log(frameCnt.current++, " ", docs);

	return (
		<div className="App">
			<h1>Shared Clipboard</h1>
			<p>{docs.loaded ? "Loaded" : "Loading..."}</p>
			<AddLink db={db} />
			<ul>
				{Object.keys(docs.content).map((docId) => {
					return (
						<ListItem db={db} id={docId} text={docs.content[docId].message} />
					);
				})}
			</ul>
		</div>
	);
};

export default App;
