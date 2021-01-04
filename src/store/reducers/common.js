import { TOGGLE_LOADER } from "../actions/common";
import { GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/catalogue";

let initialState = {
	productsList: [],
	selectedProduct: {},
};

export default function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case TOGGLE_LOADER:
			return {
				...state,
				loaderStatus: payload,
			};
		case GET_PRODUCTS:
			return {
				...state,
				productsList: payload,
			};
		case ADD_PRODUCT:
			return {
				...state,
				productsList: [...state.productsList, payload],
			};
		case DELETE_PRODUCT:
			return {
				...state,
				productsList: state.productsList.filter((item) => item.id !== payload),
			};

		case UPDATE_PRODUCT:
			return {
				...state,
				productsList: state.productsList.map((item) => {
					if (item.id !== payload.id) return item;
					else return payload;
				}),
			};
		default:
			return state;
	}
}
