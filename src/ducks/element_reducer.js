const inittialStore = {
	elementID: null
};

let count = 0;

const ADD_ELEMENT = 'ADD_ELEMENT';

export default function elementReducer(state = inittialStore, action) {
	switch (action.type) {
		case ADD_ELEMENT:
			return Object.assign({}, state, {elementID: action.payload});
		default:
			return state;
	}
};

export function addElement() {
	count++;

	return {
		type   : ADD_ELEMENT,
		payload: count
	};
}
