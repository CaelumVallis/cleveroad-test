import React, { useState } from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { auth } from "../../store/actions/common";
import { Backdrop, Box, Button, Grid, makeStyles, Paper, Snackbar } from "@material-ui/core";
import { Link, Route, useRouteMatch, Switch, useHistory } from "react-router-dom";
import Loader from "../common/Loader";

function Login({ auth }) {
	let history = useHistory();
	let { path } = useRouteMatch();

	let useStyles = makeStyles(() => ({
		backdrop: {
			zIndex: 998,
			color: "#fff",
		},
	}));
	let classes = useStyles();

	let [loadingStatus, setLoadingStatus] = useState(false);
	let [snackbar, setSnackbar] = useState({ status: false, message: "" });

	function onSubmit(values, path) {
		setLoadingStatus(true);
		auth(values, path).then((error) => {
			setLoadingStatus(false);
			error ? setSnackbar({ status: true, message: error }) : history.push("/profile");
		});
	}

	return (
		<>
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				onClose={() => {
					setSnackbar({ status: false });
				}}
				open={snackbar.status}
				autoHideDuration={5000}
				message={snackbar.message}
			/>
			<Loader status={loadingStatus} />
			<Backdrop className={classes.backdrop} open={true}>
				<Paper>
					<Box p={3}>
						<Switch>
							<Route path={path + "/signIn"}>
								<LoginForm onSubmit={onSubmit} btnText={"Sign In"} />
							</Route>
							<Route path={path + "/newUser"}>
								<LoginForm onSubmit={onSubmit} btnText={"Sign Up"} />
							</Route>
							<Route path={path}>
								<Grid container spacing={2}>
									<Grid item>
										<Button variant="contained" color="primary" component={Link} to={path + "/signIn"}>
											Sign in
										</Button>
									</Grid>
									<Grid item>
										<Button variant="contained" component={Link} to={path + "/newUser"}>
											Create account
										</Button>
									</Grid>
								</Grid>
							</Route>
						</Switch>
					</Box>
				</Paper>
			</Backdrop>
		</>
	);
}

let mapDispatchToProps = {
	auth,
};

export default connect(null, mapDispatchToProps)(Login);
