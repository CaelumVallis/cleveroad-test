import { Button, ButtonGroup, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function CatalogueItem({ product, onDelete, auth }) {
	let currentDate = new Date();
	let valueDate = new Date(product.discountDate);

	return (
		<Card elevation={3}>
			<CardContent>
				<img width="100%" src={product.image} alt="pic" />
				<Typography variant="h5">{product.title}</Typography>
				<Typography variant="body2">{product.description}</Typography>
				<Typography variant="h6">{product.price}$</Typography>
				{currentDate < valueDate && (
					<Grid item>
						<Typography variant="body2">{product.discount}%</Typography>
						<Typography variant="caption">Discount to: {product.discountDate}</Typography>
					</Grid>
				)}
			</CardContent>
			<CardActions>
				{auth && (
					<ButtonGroup fullWidth={true}>
						<Button component={Link} to={`/catalogue/addNewItem/${product.id}`}>
							Edit
						</Button>
						<Button onClick={() => onDelete(product.id)}>Delete</Button>
					</ButtonGroup>
				)}
			</CardActions>
		</Card>
	);
}

export default CatalogueItem;
