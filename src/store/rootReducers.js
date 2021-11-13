import {combineReducers} from "@reduxjs/toolkit";
import todo from './todo';

const rootReducers = combineReducers({
    todo
});

export default rootReducers;