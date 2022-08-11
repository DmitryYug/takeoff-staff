import {combineReducers, createStore} from "redux";
import {appReducer} from "./app-reducer";
import thunk from 'redux-thunk'
import {applyMiddleware} from "@reduxjs/toolkit";

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

const rootReducer = combineReducers({
    appReducer
    // authReducer,
    // contactsReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk));
export default store

