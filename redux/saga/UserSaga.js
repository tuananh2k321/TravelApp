import { takeEvery, put, fork, call, takeLatest, takeLeading } from 'redux-saga/effects';
import { addUser, setToken, addData, addDataRegister } from '../reducer/UserSlice';
import {login, register, sendEmail} from '../action/userAction'


// Các worker saga
function*  doRegister(action) {
    try {
        const [name, lastName, dob, phoneNumber, email, password] = action.payload
        console.log(name, lastName, dob, phoneNumber, email, password)

        const res = yield call(register, name, lastName, dob, phoneNumber, email, password)

        yield put(addDataRegister(res))
        console.log("doRegister addDataRegister: ",JSON.stringify(res))

    } catch (err) {
        console.error("Error in doRegister:", err);
    }  
}


function* doLogin(action) {
    try {
        console.log("doLogin")
        const [email, password] = action.payload
        console.log("doLogin Email: "+email+" doLogin password: "+password)

        const res = yield call(login, email, password)
        // console.log("login: "+JSON.stringify(res))

        if (res.result) {
            yield put(addData(res))
            console.log("doLogin addData: ",JSON.stringify(res))

            yield put(addUser(res.user))
            console.log("doLogin addUser: ",res.user)

            yield put(setToken(res.token))
            console.log("doLogin setToken: ",res.token)
        } else {
            yield put(addData(res))
            console.log("doLogin addData: ",JSON.stringify(res))
        }
        
    } catch (err) {
        console.error("Error in doLogin:", err);
    }  
}

function* doSendEmail(action) {
    try {
        console.log("doSendEmail")
        const [email] = action.payload
        console.log("doSendEmail: "+email)

        yield call(sendEmail, email)
        // console.log("login: "+JSON.stringify(res))

        // if (res.result) {
        //     yield put(addData(res))
        //     console.log("doLogin addData: ",JSON.stringify(res))

        //     yield put(addUser(res.user))
        //     console.log("doLogin addUser: ",res.user)

        //     yield put(setToken(res.token))
        //     console.log("doLogin setToken: ",res.token)
        // } else {
        //     yield put(addData(res))
        //     console.log("doLogin addData: ",JSON.stringify(res))
        // }
        
    } catch (err) {
        console.error("Error in doLogin:", err);
    }  
}




  // Các watcher saga

function* watchLogin() {
    console.log("watchLogin")
    yield takeLatest("LOGIN", doLogin)
}

function* watchRegister() {
    console.log("watchRegister")
    yield takeLatest("REGISTER", doRegister)
}

function* watchSendEmail() {
    console.log("watchRegister")
    yield takeLatest("SENDEMAIL", doSendEmail)
}


export default function* UserSaga() {
    yield fork(watchRegister)
    yield fork(watchLogin)
    yield fork(watchSendEmail)
}


