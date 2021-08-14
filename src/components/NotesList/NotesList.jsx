import React, { useState, useEffect, useRef } from "react";
import ListItem from "./NotesListItem/NotesListItem";
import {
    getFirestore,
    collection,
    query,
    getDoc,
    doc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "./notesList.css";
import resizeAllListItems from "../../utils/resizeListItems";
import { AssignmentReturnSharp } from "@material-ui/icons";
import StackGrid from "react-stack-grid";
const NotesList = ({ user, setOpen }) => {
    const firebaseApp = getApp();
    const firestore = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);

    const [docs, setDocs] = useState({
        content: [],
        loaded: false,
    });

    useEffect(() => {
        // * RUNS ONLY ON MOUNT & UNMOUNT

        if (user.loggedIn) {
            const userDocRef = doc(firestore, `boards/${user.details.uid}`);
            getDoc(userDocRef)
                .then((ds) =>
                    console.log(
                        "ds --> ",
                        setDocs({ content: ds.get("links"), loaded: true })
                    )
                )
                .catch((err) => console.error(err));
            // getDocs(query(boardsCollection)).then(qs=>console.log("qs --> ",qs)).catch(err=>console.error(err))
            // * collection.get returns a promise
            // console.log(user.details.uid);
            // if(docs)
            // {
            // let unsubscribe = firestore
            // 	.collection(`boards`)
            // 	.doc(user.details.uid)
            // 	.onSnapshot((doc) => {
            // 		let changes = doc.data();
            // 		if (!changes) {
            // 			firestore.collection("boards").doc(user.details.uid).set({
            // 				links: [],
            // 			});
            // 		} else {
            // 			setDocs((oldState) => {
            // 				// * Change the state
            // 				console.log(changes.links);
            // 				let temp = { content: changes.links, loaded: true };

            // 				return temp;
            // 			});
            // 		}
            // 	});
            return () => {
                // unsubscribe();
            };
        }
    }, [user]);

    return (
        <div className="list-container">
            {!docs.loaded && (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            )}

            {docs.content.length > 0 && (
                <List
                    docs={docs}
                    firestore={firestore}
                    user={user}
                    setOpen={setOpen}
                />
            )}
        </div>
    );
};

function List({ docs, firestore, user, setOpen }) {
    // useEffect(() => {
    //     resizeAllListItems();
    //     window.addEventListener("resize", resizeAllListItems);
    //     return () => {
    //         window.removeEventListener("resize", resizeAllListItems);
    //     };
    // }, []);
    return (
        <ul className="list">
            {docs.content.map((link, idx) => {
                return (
                    <ListItem
                        firestore={firestore}
                        text={link}
                        uid={user.details.uid}
                        setOpen={setOpen}
                        key={idx}
                        idx={idx}
                    />
                );
            })}
        </ul>
    );
    // return (
    //     <StackGrid columnWidth={200}>
    //         {docs.content.map((link, idx) => {
    //             return (
    //                 <ListItem
    //                     firestore={firestore}
    //                     text={link}
    //                     uid={user.details.uid}
    //                     setOpen={setOpen}
    //                     key={idx}
    //                 />
    //             );
    //         })}
    //     </StackGrid>
    // );
}

export default NotesList;
