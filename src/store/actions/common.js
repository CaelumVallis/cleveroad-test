import firebase from "firebase/app";

export let auth = (values, path) => () => {
	if (path === "/login/signIn") return login(values);
	if (path === "/login/newUser") return signUp(values);
};

let login = ({ username, password }) => {
	return firebase
		.auth()
		.signInWithEmailAndPassword(username, password)
		.then((user) => {
			// Signed in
			// ...
		})
		.catch((error) => {
			//let errorCode = error.code;
			let errorMessage = error.message;
			return errorMessage;
		});
};

let signUp = ({ username, password }) => {
	return firebase
		.auth()
		.createUserWithEmailAndPassword(username, password)
		.then((user) => {
			// Signed in
			// ...
		})
		.catch((error) => {
			//let errorCode = error.code;
			let errorMessage = error.message;
			return errorMessage;
		});
};

export let TOGGLE_LOADER = "TOGGLE_LOADER_ACTION";
export let toggleLoader = (status) => {
	return (dispatch) => {
		return dispatch({ type: TOGGLE_LOADER, payload: status });
	};
};
