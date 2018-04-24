import { combineReducers } from 'redux';

import userReducer from '../reducers/userReducers';
import linksReducers from "./linksReducers";

export default combineReducers({
    user: userReducer,
    links: linksReducers,
});