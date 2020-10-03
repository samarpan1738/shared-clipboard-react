import React from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";

const ListItem = ({ id, text, uid }) => {
	const db = firebase.firestore();

	function removeLink(e) {
		db.collection("boards")
			.doc(uid)
			.update({
				links: firebase.firestore.FieldValue.arrayRemove(
					e.target.parentNode.childNodes[0].innerText
				),
			});
	}
	return (
		<li className="list__item">
			<span className="list__item__content">{text}</span>
			<span
				role="img"
				aria-label="Remove Link btn"
				className="deleteIcon"
				onClick={removeLink}
			>
				❌
			</span>
			<button className="copy" data-clipboard-target={"#text-" + id}>
				Copy
			</button>
		</li>
	);
};

export default ListItem;
