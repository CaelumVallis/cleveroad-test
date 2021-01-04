import { Grid } from "@material-ui/core";
import CatalogueItem from "./CatalogueItem";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProducts, deleteProduct } from "../../store/actions/catalogue";

function Catalogue({ getProducts, deleteProduct, productsList, auth }) {
	useEffect(() => {
		getProducts();
	}, [getProducts]);

	return (
		<>
			<Grid container spacing={2} justify="space-between">
				{productsList.map((item) => {
					return (
						<Grid key={item.id} item xs={12} sm={6} md={4}>
							<CatalogueItem auth={auth} onDelete={deleteProduct} product={item} />
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}

function mapStateToProps(state) {
	return state.common;
}

let mapDispatchToProps = {
	getProducts,
	deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
