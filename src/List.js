import React, { useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";
import ClipboardJS from "clipboard";

const List = ({ db }) => {
	const [docs, setDocs] = useState({ content: {}, loaded: false });
	const clipboard = new ClipboardJS(".copy");
	clipboard.on("success", function (e) {
		// console.info("Action:", e.action);
		// console.info("Text:", e.text);
		// console.info("Trigger:", e.trigger);

		e.clearSelection();
	});
	const renders = useRef(0);
	useEffect(() => {
		// * ON RENDER COMPLETE
		if (!docs.loaded) {
			// * collection.get returns a promise
			db.collection("boards").onSnapshot((snapshot) => {
				setDocs((oldState) => {
					// * Change the state
					let temp = { content: { ...oldState.content }, loaded: true };
					snapshot.docChanges().forEach(({ type, doc }) => {
						if (type === "removed") delete temp.content[doc.id];
						else temp.content[doc.id] = doc.data();
					});
					return temp;
				});
			});
		}
	}, []);

	console.log("List render count --> ", renders.current++);

	return (
		<div>
			<p>{docs.loaded ? "Loaded" : "Loading..."}</p>
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

export default List;
