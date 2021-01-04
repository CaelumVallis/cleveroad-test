import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

let useStyles = makeStyles(() => ({
	backdrop: {
		zIndex: 999,
		color: "#fff",
	},
}));

function Loader({ status }) {
	let classes = useStyles();

	return (
		<>
			<Backdrop className={classes.backdrop} open={status}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
}

export default Loader;
