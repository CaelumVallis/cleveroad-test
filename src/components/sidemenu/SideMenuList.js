import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

function SideMenuList({ classProp }) {
	return (
		<List className={classProp}>
			<ListItem>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary={"Groceries"} />
			</ListItem>
			<ListItem>
				<Button
					component={Link}
					to={"/catalogue/addNewItem/new"}
					variant="contained"
					fullWidth={true}
					startIcon={<AddIcon />}
				>
					Add new
				</Button>
			</ListItem>
		</List>
	);
}

export default SideMenuList;
