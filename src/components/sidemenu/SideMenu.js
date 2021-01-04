import React from "react";
import { Hidden, Paper, Drawer, makeStyles } from "@material-ui/core";
import SideMenuList from "./SideMenuList";

function SideMenu({ drawerStatus, toggleDrawer }) {
	const useStyles = makeStyles({
		list: {
			width: 250,
		},
	});
	const classes = useStyles();

	return (
		<>
			<Hidden mdUp>
				<Drawer anchor="left" open={drawerStatus} onClose={toggleDrawer}>
					<SideMenuList classProp={classes.list} />
				</Drawer>
			</Hidden>
			<Hidden smDown>
				<Paper>
					<SideMenuList />
				</Paper>
			</Hidden>
		</>
	);
}

export default SideMenu;
