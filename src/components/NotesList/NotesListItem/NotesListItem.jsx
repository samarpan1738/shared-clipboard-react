import React, { useRef } from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteIcon from "@material-ui/icons/Delete";
import * as clipboard from "clipboard-polyfill/text";
import "./notesListItem.css";
import { ReactComponent as OptionsIcon } from "../../../assets/more-vertical.svg";
import { ReactComponent as TrashIcon } from "../../../assets/trash.svg";
import { ReactComponent as CopyIcon } from "../../../assets/copy.svg";
import { getApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
const title = "TitleTitleTitleabcdef";
const MAX_TITLE_CHARACTERS = 15;
const ListItem = ({ db, text, uid, setOpen, idx }) => {
    // const userDocRef = doc(db, `boards/${uid}`);
    // updateDoc(userDocRef, {
    //     links: db.FieldValue.arrayRemove(),
    // });
    function removeLink(e) {
        db.collection("boards").doc(uid).update({
            links: db.FieldValue.arrayRemove(),
        });
    }
    function copyToClipboard(text) {
        clipboard.writeText(text).then(
            function () {},
            function () {
                console.log("error!");
            }
        );
    }
    return (
        <li className="list__item">
            <div className="list__item__header">
                <p>
                    {/* {title.length > MAX_TITLE_CHARACTERS
                        ? title.substring(0, MAX_TITLE_CHARACTERS - 3) + "..."
                        : title} */}
                    {title}
                </p>
                <div className="list__item__options">
                    <abbr title="Copy">
                        <CopyIcon
                            className="icon copy"
                            onClick={() => copyToClipboard(text)}
                        />
                    </abbr>
                    <abbr title="Delete">
                        <TrashIcon className="icon trash" />
                    </abbr>
                </div>
            </div>
            <div className="list__item__content">
                <div>
                    <p className="list__item__text">
                        {/* {text.length > 70
                            ? text.substring(0, 70) + " ..."
                            : text} */}
                        {text}
                    </p>
                </div>
            </div>
            <div className="list__item__metadata">
                <p>2nd August 2021 // 14:02</p>
            </div>
        </li>
    );
};

export default ListItem;
