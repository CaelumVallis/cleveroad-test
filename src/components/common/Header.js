import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, Hidden, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

function Header({ auth, toggleDrawer }) {
	return (
		<AppBar position="static">
			<Toolbar>
				<Container>
					<Grid container>
						<Grid item xs={2}>
							<Hidden mdUp>
								<IconButton onClick={() => toggleDrawer()} color="inherit">
									<MenuIcon />
								</IconButton>
							</Hidden>
						</Grid>
						<Grid item container alignItems="center" xs={8}>
							<Typography variant="h5">Cleveroad</Typography>
						</Grid>
						<Grid container item xs={2} alignContent="center">
							{auth.currentUser ? (
								<IconButton color="inherit" onClick={() => auth.signOut()}>
									<ExitToAppIcon />
								</IconButton>
							) : (
								<IconButton color="inherit" component={Link} to="/login">
									<PersonIcon />
								</IconButton>
							)}
						</Grid>
					</Grid>
				</Container>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
