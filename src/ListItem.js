import React from "react";

const ListItem = ({ id, text, db }) => {
	function removeLink(e) {
		// console.log(e.target.parentNode.id);
		db.collection("boards").doc(e.target.parentNode.id).delete();
	}
	return (
		<li id={id} key={id}>
			<span>{text}</span>
			<span
				role="img"
				aria-label="Remove Link btn"
				className="deleteIcon"
				onClick={removeLink}
			>
				❌
			</span>
		</li>
	);
};

export default ListItem;
