import React, { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import AddBoxIcon from '@material-ui/icons/AddBox';

const AddLink = ({ user }) => {
	const db = firebase.firestore();
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
			<AddBoxIcon className="addIcon" onClick={addLink} fontSize="large"/>
			{/* <button onClick={addLink}>Add</button> */}
		</div>
	);
};
export default AddLink;
