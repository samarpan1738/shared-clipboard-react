import React, { useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";
import * as firebase from "firebase/app";
import "firebase/firestore";

const List = ({ user,setOpen }) => {
	const db = firebase.firestore();
	const [docs, setDocs] = useState({
		content: [],
		loaded: false,
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
	return (
		<div className="list-container">
			{!docs.loaded && (
				<div className="progress">
					<div className="indeterminate"></div>
				</div>
			)}

			{
				docs.content.length>0 && (<ul className="list">
				{docs.content.map((link,idx) => {
					return <ListItem db={db} text={link} uid={user.details.uid} setOpen={setOpen} key={idx}/>;
				})}
			</ul>)
			}
		</div>
	);
};

export default List;
