import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducer/UserSlice";
import createSagaMiddleware from 'redux-saga'
import sagas from "./saga/RootSaga";
// const sagaMiddleware = create
const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

export const Store = configureStore({
    reducer: {
        user: UserSlice

    },
    middleware
})

sagaMiddleware.run(sagas)

