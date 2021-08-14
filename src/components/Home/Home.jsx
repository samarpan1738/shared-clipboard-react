import React, { useRef } from "react";
import "./home.css";
import { getFirestore } from "firebase/firestore";
import { signOut } from "firebase/auth";
import List from "../NotesList/NotesList";
import Sidebar from "../Sidebar/Sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { ReactComponent as ChevronRightIcon } from "../../assets/chevron-right.svg";
import { ReactComponent as NewNoteIcon } from "../../assets/file-plus.svg";
const Home = ({ user, auth, authenticating, setAuthenticating }) => {

    function logout() {
        signOut(auth);
    }

    return (
        <div className="Home">
            <Sidebar />
            <div className="heroSection">
                <div className="header-container">
                    {/* Add breadcrumbs */}
                    <Breadcrumb
                        spacing="8px"
                        separator={<ChevronRightIcon color="gray.500" />}
                        backgroundColor="rgb(17, 17, 17)"
                        boxShadow="none"
                    >
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">All</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <button className="new-note-btn"><NewNoteIcon className="icon new-note"/> New note</button>
                    {/* <ExitToAppIcon id="logout" onClick={logout} /> */}
                </div>
                <div className="main-content">
                    <List user={user} />
                </div>
            </div>
        </div>
    );
};

export default Home;
