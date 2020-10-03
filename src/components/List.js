import React, { useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";
import ClipboardJS from "clipboard";
import * as firebase from "firebase/app";
import "firebase/firestore";

const List = ({ user }) => {
	const db = firebase.firestore();
	const [docs, setDocs] = useState({
		content: [],
		loaded: false,
	});

	const clipboard = new ClipboardJS(".copy");

	clipboard.on("success", function (e) {
		// console.info("Action:", e.action);
		// console.info("Text:", e.text);
		// console.info("Trigger:", e.trigger);

		e.clearSelection();
	});
	// console.log("User details --> ", uid);
	const renders = useRef(0);
	useEffect(() => {
		// * RUNS ONLY ON MOUNT & UNMOUNT

		if (user.loggedIn) {
			// * collection.get returns a promise
			// console.log(user.details.uid);
			// if(docs)
			// {
			let unsubscribe = db
				.collection(`boards`)
				.doc(user.details.uid)
				.onSnapshot((doc) => {
					let changes = doc.data();
					if (!changes) {
						db.collection("boards").doc(user.details.uid).set({
							links: [],
						});
					} else {
						setDocs((oldState) => {
							// * Change the state
							console.log(changes.links);
							let temp = { content: changes.links, loaded: true };

							return temp;
						});
					}
				});
			return () => {
				unsubscribe();
			};
		}
	}, [user]);

	console.log("List render count --> ", renders.current++);
	console.log(docs.content);
	return (
		<div className="list-container">
			{docs.loaded ? (
				""
			) : (
				<div class="progress">
					<div class="indeterminate"></div>
				</div>
			)}

			<ul className="list">
				{docs.content.map((link) => {
					return <ListItem db={db} text={link} uid={user.details.uid} />;
				})}
			</ul>
		</div>
	);
};

export default List;
