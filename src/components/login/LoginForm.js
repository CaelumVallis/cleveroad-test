import React from "react";
import { Formik, Form } from "formik";
import { Button, List, ListItem } from "@material-ui/core";
import MyInputField from "../common/MyInputField";
import { useRouteMatch } from "react-router-dom";

function LoginForm({ onSubmit, btnText, loadingStatus }) {
	let { path } = useRouteMatch();

	function validate(value) {
		let error;

		if (!value) {
			error = "Required";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			error = "Invalid email address";
		}
		return error;
	}

	function handleSubmit(values) {
		onSubmit(values, path);
	}

	return (
		<div>
			<Formik initialValues={{ username: "", password: "" }} onSubmit={handleSubmit}>
				{({ errors, touched }) => (
					<Form>
						<List>
							<ListItem>
								<MyInputField
									name="username"
									label="Email"
									validate={validate}
									error={touched.username ? errors.username : false}
								/>
							</ListItem>
							<ListItem>
								<MyInputField type="password" name="password" label="Password" />
							</ListItem>
							<ListItem>
								<Button variant="contained" color="primary" type="submit">
									{btnText}
								</Button>
							</ListItem>
						</List>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default LoginForm;
