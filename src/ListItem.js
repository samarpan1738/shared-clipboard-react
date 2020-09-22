import React from "react";

const ListItem = ({ id, text, db }) => {
	function removeLink(e) {
		// console.log(e.target.parentNode.id);
		db.collection("boards").doc(e.target.parentNode.id).delete();
	}
	return (
		<li id={id} key={id} className="list__item">
			<span id={"text-" + id} className="list__item__content">
				{text}
			</span>
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
