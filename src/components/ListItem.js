import React,{useRef} from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import * as clipboard from "clipboard-polyfill/text";

const ListItem = ({ db, text, uid ,setOpen}) => {
	// const db = firebase.firestore();
	const content=useRef(null);
	function removeLink(e) {
		
		db.collection("boards")
			.doc(uid)
			.update({
				links: firebase.firestore.FieldValue.arrayRemove(
					content.current.innerText
				),
			});
	}
	function copyToClipboard()
	{
		clipboard.writeText(content.current.innerText).then(
			function () {
			  setOpen(true);
			},
			function () {
			  console.log("error!");
			}
		  );
	}
	return (
		<li className="list__item">
			<span ref={content} className="list__item__content">{text}</span>
			{/* <span
				role="img"
				aria-label="Remove Link btn"
				className="deleteIcon"
				onClick={removeLink}
			>
				</span> */}
			<FileCopyIcon className={"copy"} onClick={copyToClipboard}/>
			<DeleteIcon className={"deleteIcon"} onClick={removeLink} color="error" />
			{/* <button className="copy" data-clipboard-target={"#text-" + id}> */}
			{/* </button> */}
		</li>
	);
};

export default ListItem;
