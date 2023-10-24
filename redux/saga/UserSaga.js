import { takeEvery, put, fork, call, takeLatest, takeLeading } from 'redux-saga/effects';
import { addUser, setToken, addData, addDataRegister, addDataSendOTP, addDataVerifyOTP, addDataChangePassword } from '../reducer/UserSlice';
import {login, register, sendEmail, sendOTP, verifyOTP, updatePasswordByEmail, sendEmailChangePassword} from '../action/userAction'


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
    } catch (err) {
        console.error("Error in doSendEmail:", err);
    }  
}

function* doSendOTP(action) {
    try {
        console.log("doSendOTP")
        const [phoneNumber] = action.payload
        console.log("doSendOTP: "+phoneNumber)

        const res = yield call(sendOTP, phoneNumber)

        yield put(addDataSendOTP(res))
        console.log("doSendOTP addDataSendOTP: ",JSON.stringify(res))

    } catch (err) {
        console.error("Error in doSendOTP:", err);
    }  
}

function* doVerifyOTP(action) {
    try {
        console.log("doVerifyOTP")
        const [phoneNumber, otp] = action.payload
        console.log("otp: "+otp)
        console.log("phoneNumber: "+phoneNumber)
        const res = yield call(verifyOTP,  phoneNumber, otp)
        yield put(addDataVerifyOTP(res))
        console.log("doVerifyOTP addDataVerifyOTP: ",JSON.stringify(res))
    } catch (err) {
        console.error("Error in doVerifyOTP:", err);
    }  
}

function* doUpdatePasswordByEmail(action) {
    try {
        console.log("doUpdatePasswordByEmail")
        const [email, newPassword] = action.payload
        console.log("email: "+email)
        console.log("newPassword: "+newPassword)
        const res = yield call(updatePasswordByEmail, email, newPassword)
        yield put(addDataChangePassword(res))
        console.log("doUpdatePasswordByEmail addDataChangePassword: ",JSON.stringify(res))
    } catch (err) {
        console.error("Error in doUpdatePasswordByEmail:", err);
    }  
}

function* doWatchSendMailChangePassword(action) {
    try {
        console.log("doWatchSendMailChangePassword")
        const [email] = action.payload
        console.log("email: "+email)
        yield call(sendEmailChangePassword, email)
    } catch (err) {
        console.error("Error in doUpdatePasswordByEmail:", err);
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
    console.log("watchSendEmail")
    yield takeLatest("SEND-EMAIL", doSendEmail)
}

function* watchSendOTP() {
    console.log("watchSendOTP")
    yield takeLatest("SEND-OTP", doSendOTP)
}

function* watchVerifyOTP() {
    console.log("watchVerifyOTP")
    yield takeLatest("VERIFY-OTP", doVerifyOTP)
}

function* watchUpdatePasswordByEmail() {
    console.log("watchVerifyOTP")
    yield takeLatest("CHANGE-PASSWORD", doUpdatePasswordByEmail)
}

function* watchSendMailChangePassword() {
    console.log("watchSendMailChangePassword")
    yield takeLatest("SEND-MAIL-CHANGE-PASSWORD", doWatchSendMailChangePassword)
}


export default function* UserSaga() {
    yield fork(watchRegister)
    yield fork(watchLogin)
    yield fork(watchSendEmail)
    yield fork(watchSendOTP)
    yield fork(watchVerifyOTP)
    yield fork(watchUpdatePasswordByEmail)
    yield fork(watchSendMailChangePassword)
}


