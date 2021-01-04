import React from "react";
import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

function MyInputField({ label, type, error, ...props }) {
	let [field] = useField(props);

	return (
		<TextField
			variant="outlined"
			error={error ? true : false}
			helperText={error}
			{...field}
			fullWidth={true}
			label={label}
			type={type}
		/>
	);
}

export default MyInputField;
