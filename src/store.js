import {createStore} from 'redux';
import elementReducer from './ducks/element_reducer';

export default createStore(elementReducer);