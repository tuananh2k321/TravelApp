import { takeEvery, put, fork, call, takeLatest, takeLeading } from 'redux-saga/effects';
import { addUser, setToken, setLoading } from '../reducer/UserSlice';
import {Login} from '../action/userAction'


// Các worker saga
function* doLogin(action) {
    try {
        console.log("doLogin")
        const [email, password] = action.payload
        console.log("doLogin Email: "+email+" doLogin password: "+password)

        yield put(setLoading(false));

        const res = yield call(Login, email, password)

        yield put(addUser(res.user))
        console.log("doLogin user: ",res.user)

        
        yield put(setToken(res.token))
        console.log("doLogin token: ",res.token)
    } catch (err) {
        console.error("Error in doLogin:", err);
    }  
}


  // Các watcher saga

function* watchLogin() {
    console.log("watchLogin")
    yield takeLatest("LOGIN", doLogin)
}


export default function* UserSaga() {
    yield fork(watchLogin)
}


