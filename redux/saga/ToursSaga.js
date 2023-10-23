import { takeEvery, put, fork, call, takeLatest, takeLeading } from 'redux-saga/effects';
import { getTours } from '../reducer/ToursSlice';
import { TourAll } from '../action/tourAction';


// Các worker saga
function* doTourAll(action) {
    try {
        console.log("doTourAll")
        const [tours] = action.payload;

        const res = yield call(TourAll, tours)

        yield put(getTours(res.tours))
        console.log("doTourAll user: ",res.tours)

    } catch (err) {
        console.error("Error in doTourAll:", err);
    }  
}


  // Các watcher saga

function* watchTourAll() {
    console.log("watchTourAll")
    yield takeLatest("TourAll", doTourAll)
}


export default function* ToursSaga() {
    yield fork(watchTourAll)
}


