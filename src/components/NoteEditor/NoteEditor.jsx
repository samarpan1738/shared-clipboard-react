import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./noteEditor.css";
import "react-quill/dist/quill.snow.css";

function NoteEditor() {
    const [value, setValue] = useState('');
    return (
        <div className="NoteEditor">
            <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
    );
}

export default NoteEditor;
