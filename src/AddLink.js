import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import * as firebase from "firebase/app";
import "firebase/firestore";

const AddLink = ({ db, user }) => {
	const [newLink, setNewLink] = useState("");
	function addLink() {
		console.log(newLink);
		db.collection("boards")
			.doc(user.details.uid)
			.update({
				links: firebase.firestore.FieldValue.arrayUnion(newLink),
			});
		setNewLink("");
	}

	function handleChange(e) {
		setNewLink(e.target.value);
	}
	return (
		<div className="addLinkContainer">
			<input
				type="text"
				placeholder="Add new link"
				id="inp-box"
				onChange={handleChange}
				value={newLink}
				variant="filled"
			/>
			<button onClick={addLink}>Add</button>
		</div>
	);
};
export default AddLink;
