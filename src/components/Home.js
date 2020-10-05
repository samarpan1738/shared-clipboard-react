import React, { useRef } from "react";
import "../App.css";
import "firebase/firestore";
import "firebase/auth";
import AddLink from "./AddLink";
import List from "./List";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

const Home = ({ user, auth, authenticating, setAuthenticating }) => {
	// const db = firebase.firestore();
	// const auth = firebase.auth();
	const [open, setOpen] = React.useState(false);
	const renders = useRef(0);

	console.log("App render count -> ", renders.current++);
	
	function logout() {
		auth.signOut();
	}
	
	function handleClose(event, reason) {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpen(false);
	  };
	
	  function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	  }
	
	  function SlideTransition(props) {
			return <Slide {...props} direction="up" />;
		}
	
	return (
		<div className="App">
			<div className="header-container">
				{/* <button id="logout" onClick={logout}>
					Logout
				</button> */}
				<h1>
					{user.details.displayName.split(" ")[0] + "'s "}Shared Clipboard
				</h1>
				<ExitToAppIcon id="logout" onClick={logout}/>
			</div>
			<div className="main-content">
				<AddLink user={user} />
				<List user={user} setOpen={setOpen}/>
			</div>
			<Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        		<Alert onClose={handleClose} severity="success">
          		Copied to clipboard!
        		</Alert>
      		</Snackbar>
		</div>
	);
};

export default Home;
