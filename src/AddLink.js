import React, { useState } from "react";

const AddLink = ({ db }) => {
	const [newLink, setNewLink] = useState("");

	function addLink() {
		console.log(newLink);
		db.collection("boards").doc().set({
			message: newLink,
		});
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
			/>
			<button onClick={addLink}>Add</button>
		</div>
	);
};
export default AddLink;
