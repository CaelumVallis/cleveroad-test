import { app } from "../../base";
let database = app.firestore();

export let GET_PRODUCTS = "GET_PRODUCTS_ACTION";
export let getProducts = () => {
	return (dispatch) => {
		let productsArr = [];
		database
			.collection("products")
			.get()
			.then((products) => {
				products.docs.forEach((doc) => {
					productsArr.push(doc.data());
				});
			})
			.then(() => {
				return dispatch({ type: GET_PRODUCTS, payload: productsArr });
			});
	};
};

export let saveProduct = (product, fileUrl) => {
	return product.id ? updateProduct(product, fileUrl) : addProduct(product, fileUrl);
};

export let ADD_PRODUCT = "ADD_PRODUCT_ACTION";
let addProduct = (values, fileUrl) => {
	return (dispatch) => {
		let title = values.title;
		let id = generatedId();
		let newProduct = {
			title,
			description: values.description,
			image: fileUrl,
			price: values.price,
			discount: values.discount,
			discountDate: values.discountDate,
			id,
		};
		database.collection("products").doc(id).set(newProduct);
		return dispatch({ type: ADD_PRODUCT, payload: newProduct });
	};
};

export let DELETE_PRODUCT = "DELETE_PRODUCT_ACTION";
export let deleteProduct = (id) => {
	return (dispatch) => {
		database
			.collection("products")
			.doc(id)
			.delete()
			.then(function () {
				return dispatch({ type: DELETE_PRODUCT, payload: id });
			});
	};
};

export let UPDATE_PRODUCT = "UPDATE_PRODUCT_ACTION";
let updateProduct = (product, fileUrl) => {
	return (dispatch) => {
		product.image = fileUrl;
		database
			.collection("products")
			.doc(product.id)
			.update(product)
			.then(() => {
				return dispatch({ type: UPDATE_PRODUCT, payload: product });
			});
	};
};

let generatedId = () => {
	return "_" + Math.random().toString(36).substr(2, 9);
};
