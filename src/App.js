import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Header from "./components/common/Header";
import SideMenu from "./components/sidemenu/SideMenu";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Grid } from "@material-ui/core";
import Catalogue from "./components/catalogue/Catalogue";
import CatalogueModalForm from "./components/catalogue/CatalogueModalForm";

let auth = firebase.auth();

function App() {
	useAuthState(auth);

	let [authStatus, setAuthStatus] = useState();
	let [drawerStatus, setDrawerStatus] = useState(false);

	auth.onAuthStateChanged((user) => {
		setAuthStatus(user);
	});

	function toggleDrawer() {
		setDrawerStatus(!drawerStatus);
	}

	return (
		<>
			<Header auth={auth} toggleDrawer={toggleDrawer} />
			<Box m={2}>
				<Grid container justify="center">
					<Grid container item xl={6} spacing={2}>
						<Grid item xs={12} md={2}>
							<SideMenu drawerStatus={drawerStatus} toggleDrawer={toggleDrawer} />
						</Grid>
						<Grid container item md={10} spacing={2} wrap="nowrap">
							<Switch>
								<Route path="/login">{auth.currentUser ? <Redirect to="/catalogue" /> : <Login />}</Route>
								<Route path="/catalogue/addNewItem/:id">
									<Grid item md={10}>
										<CatalogueModalForm />
									</Grid>
								</Route>
								<Route path="/catalogue">
									<Grid item md={10}>
										<Catalogue auth={authStatus} />
									</Grid>
								</Route>
								<Route path="*" exact>
									<Redirect to="/catalogue" />
								</Route>
							</Switch>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default App;
