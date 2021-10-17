import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';
import { addCategories, addAllSettings } from '../actions'

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(addAllSettings());
store.dispatch(addCategories());

export default store;
