import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./app-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk'

export type AppRootStateType = ReturnType<typeof rootReducer>
//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>

const rootReducer = combineReducers({appReducer})

let store = createStore(rootReducer, applyMiddleware(thunk));
export default store

