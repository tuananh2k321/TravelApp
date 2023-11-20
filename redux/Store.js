import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducer/UserSlice";
import createSagaMiddleware from 'redux-saga'
import sagas from "./saga/RootSaga";
import notificationReducer from "./reducer/NotificationReducer";

// const sagaMiddleware = create
const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

export const Store = configureStore({
    reducer: {
        user: UserSlice,
        notification: notificationReducer
    },
    middleware
})

sagaMiddleware.run(sagas)

