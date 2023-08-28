import {combineReducers} from "redux";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "./reducers/globalSlice";
import authReducer from "./reducers/authSlice";
import headReducer from "./reducers/headSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    global: globalReducer,
    head: headReducer,
    auth: authReducer
})

const persistConfig = {
    key: "KEY",
    // storage: storageSession,
    storage,
    whiteList: [],
    blackList: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.MODE !== "production",
    middleware: [thunk]
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
