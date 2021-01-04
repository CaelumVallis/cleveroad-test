import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { app } from "../../base";
import ImageIcon from "@material-ui/icons/Image";
import {
	Backdrop,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItem,
	Snackbar,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import MyInputField from "../common/MyInputField";
import { Link, withRouter } from "react-router-dom";
import { saveProduct } from "../../store/actions/catalogue";
import { useHistory } from "react-router-dom";

function CatalogueModalForm({ saveProduct, currentProduct }) {
	let history = useHistory();
	let [snackbar, setSnackbar] = useState({ status: false, message: "" });
	let [fileUrl, setFileUrl] = useState(null);
	let [submitStatus, setSubmitStatus] = useState(true);

	useEffect(() => {
		if (currentProduct.id) setSubmitStatus(false);
	}, [currentProduct.id]);

	function handleSubmit(values) {
		saveProduct(values, fileUrl);
		history.push("/catalogue");
	}

	function validateTitle(value) {
		let error;
		if (!/^.{20,60}/i.test(value)) {
			error = "минимум 20, максимум 60 символов";
		}
		return error;
	}

	function validateDescription(value) {
		let error;
		if (!/^.{0,200}/i.test(value)) {
			error = "максимум 200 символов";
		}
		return error;
	}

	function validatePrice(value) {
		let error;
		if (!/^\d{1,8}(\.\d{1,2})?$/i.test(value)) {
			error = "максимальное значение 99999999.99";
		}
		return error;
	}

	function validateDiscount(value) {
		let error;
		if (value && !/\b([1-8][0-9]|90)$\b/i.test(value)) {
			return (error = "10% - 90%");
		}
		return error;
	}

	function validateDiscountDate(value) {
		let error;
		let currentDate = new Date();
		let valueDate = new Date(value);

		if (value && (currentDate > valueDate || !/^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/i.test(value))) {
			error = "Enter valid discount date in YYYY-MM-DD format";
		}

		return error;
	}

	async function imageUpload(e) {
		setSubmitStatus(true);
		let file = e.target.files[0];
		let reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onload = () => {
				let img = new Image();
				img.onload = async () => {
					if (img.width < 4000 && img.height < 4000 && img.width > 200 && img.height > 200) {
						let storageRef = app.storage().ref();
						let fileRef = storageRef.child(file.name);
						await fileRef.put(file);
						setFileUrl(await fileRef.getDownloadURL());
						setSubmitStatus(false);
					} else {
						setSnackbar({
							status: true,
							message: "image must be between 200px and 4000px both by height and by width",
						});
						setSubmitStatus(true);
					}
				};
				img.src = reader.result;
			};
		}
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

			<Backdrop open={true}>
				<Formik initialValues={currentProduct} onSubmit={handleSubmit}>
					{({ errors, touched, values }) => (
						<Dialog open={true} fullWidth={true} maxWidth={"sm"}>
							<DialogTitle>Add new item</DialogTitle>
							<DialogContent>
								<Form>
									<List>
										<ListItem>
											<MyInputField
												name="title"
												label="Title"
												validate={validateTitle}
												error={touched.title ? errors.title : false}
											/>
										</ListItem>
										<ListItem>
											<MyInputField
												name="description"
												label="Description"
												validate={validateDescription}
												error={touched.description ? errors.description : false}
											/>
										</ListItem>
										<ListItem>
											<MyInputField
												name="price"
												label="Price"
												validate={validatePrice}
												error={touched.price ? errors.price : false}
											/>
										</ListItem>
										<ListItem>
											<MyInputField
												name="discount"
												label="Discount"
												validate={validateDiscount}
												error={touched.discount ? errors.discount : false}
											/>
										</ListItem>
										<ListItem>
											<MyInputField
												name="discountDate"
												label="Discount date"
												validate={validateDiscountDate}
												error={touched.discount || values.discount !== "" ? errors.discountDate : false}
											/>
										</ListItem>
										<ListItem>
											<Button variant="outlined" color="default" startIcon={<ImageIcon />}>
												<input accept="image/*" name="fileInput" type="file" onChange={imageUpload} />
											</Button>
										</ListItem>
										<ListItem>{currentProduct.id && <div>{currentProduct.image}</div>}</ListItem>
									</List>

									<DialogActions>
										<Button component={Link} to="/catalogue">
											Cancel
										</Button>
										<Button type="submit" disabled={submitStatus}>
											Save
										</Button>
									</DialogActions>
								</Form>
							</DialogContent>
						</Dialog>
					)}
				</Formik>
			</Backdrop>
		</>
	);
}

function mapStateToProps(state, { match: { params } }) {
	let currentProduct = state.common.productsList.find((item) => item.id === params.id);
	currentProduct = currentProduct || {
		id: null,
		title: "",
		description: "",
		price: "",
		discount: "",
		discountDate: "",
	};
	return { currentProduct };
}

let mapDispatchToProps = {
	saveProduct,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatalogueModalForm));
