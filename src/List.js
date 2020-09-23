import React, { useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";
import ClipboardJS from "clipboard";

const List = ({ db, user }) => {
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
					setDocs((oldState) => {
						// * Change the state
						let changes = doc.data();
						console.log(changes.links);
						let temp = { content: changes.links, loaded: true };

						// changes.forEach(({ type, doc }) => {
						// 	if (type === "removed") delete temp.content[doc.id];
						// 	else temp.content[doc.id] = doc.data();
						// });
						return temp;
					});
				});
			return () => {
				unsubscribe();
			};
		}
	}, [user]);

	console.log("List render count --> ", renders.current++);
	console.log(docs.content);
	return (
		<div>
			<p>{docs.loaded ? "Loaded" : "Loading..."}</p>
			<ul className="list">
				{/* {Object.keys(docs.content).map((docId) => {
					return (
						<ListItem db={db} id={docId} text={docs.content[docId].message} />
					);
				})} */}
				{docs.content.map((link) => {
					return <ListItem db={db} text={link} uid={user.details.uid} />;
				})}
			</ul>
		</div>
	);
};

export default List;
