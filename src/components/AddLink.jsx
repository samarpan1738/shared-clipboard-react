import React, { useState } from "react";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {getFirestore} from "firebase/firestore";
import { getApp } from "firebase/app";

const AddLink = ({ user }) => {
	const firebaseApp=getApp();
	const db = getFirestore(firebaseApp);
	const [newLink, setNewLink] = useState("");
	function addLink() {
		console.log(newLink);
		db.collection("boards")
			.doc(user.details.uid)
			.update({
				links: db.FieldValue.arrayUnion(newLink),
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
				placeholder="Start typing ..."
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
