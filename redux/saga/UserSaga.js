import { takeEvery, put, fork, call, takeLatest, takeLeading } from 'redux-saga/effects';
import { addUser } from '../reducer/UserSlice';
import AxiosIntance from '../../constant/AxiosIntance';


// Các worker saga
function* doAddUser(action) {
    console.log("doAddUser")
    yield put(addUser(action.payload))
}

function* doLogin(action) {
    console.log("doLogin")
    console.log(action.email)
    const user = yield call(Login, action.email, action.password)
    yield put(addUser(user))
    console.log("doLogin: ",user)
}
  
  // Các watcher saga
function* watchAddUser() {
    console.log("watchAddUser")
    yield takeLeading("ADD_USER", doAddUser)
}

function* watchLogin() {
    console.log("watchLogin")
    yield takeEvery("LOGIN", doLogin)
}


export default function* UserSaga() {
    yield fork(watchAddUser)
    yield fork(watchLogin)
}

// function call api

const Login = async (email, password) => {
    const res = await AxiosIntance().post("user/api/login", {
        password: password,
        email: email
      })

    return res
}