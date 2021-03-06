import {Map} from 'immutable';
import {duration} from "moment";

const initStore = Map();

let count = 0;

const ADD_ELEMENT = 'ADD_ELEMENT',
	  ADD_STAGE   = 'ADD_STAGE',
	  ADD_STEP    = 'ADD_STEP',
	  EDIT_ELEM   = 'EDIT_ELEM',
	  MOVE_ELEM   = 'MOVE_ELEM',
	  MOVE_STEP   = 'MOVE_STEP';

export default function elementReducer(state = initStore, action) {
	const {payload} = action;

	switch (action.type) {
		case ADD_STAGE:
			return state.set(payload, Map());
		case ADD_STEP:
			return state.setIn(payload, Map());
		case ADD_ELEMENT:
			return state.setIn(payload.path, Map({
				id  : payload.id,
				name: payload.name,
				resp: payload.resp,
				time: payload.time
			}));
		case EDIT_ELEM:
			return state.setIn(payload.path, Map(payload.data));
		case MOVE_ELEM:
			state = state.deleteIn(payload.oldPath);
			state = state.setIn(payload.newPath, Map({
				id  : payload.elemData.id,
				name: payload.elemData.name,
				resp: payload.elemData.resp,
				time: payload.elemData.time
			}));
			return state;
		default:
			return state;
	}
};


export function addStage(num) {
	return {
		type   : ADD_STAGE,
		payload: `stage${num}`

	};
}

export function addStep(path, stepNum) {
	return {
		type   : ADD_STEP,
		payload: [...path, `step${stepNum}`]
	};
}

export function addElement(path) {
	const obj = {
		path: [...path, `elem${count}`],
		id  : count,
		name: `#${count}`,
		resp: 'John Doe',
		time: duration('1:30:00'),
	};

	count++;

	return {
		type   : ADD_ELEMENT,
		payload: obj
	};
}

export function editElem(path, data) {
	return {
		type   : EDIT_ELEM,
		payload: {path, data}
	};
}

export function moveElem(oldPath, newPath, elemData) {
	return {
		type   : MOVE_ELEM,
		payload: {oldPath, newPath, elemData}
	};
}