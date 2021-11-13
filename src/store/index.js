import {configureStore} from "@reduxjs/toolkit";
import {createLogger} from "redux-logger/src";
import rootReducers from "./rootReducers";

const middlewares = [];

if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({ collapsed: true });

    middlewares.push(logger);
}

const store = configureStore({
    reducer: rootReducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    }).concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;