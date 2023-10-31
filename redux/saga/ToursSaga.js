import { takeLatest, call, put } from 'redux-saga/effects';
import {  fetchDataSuccess, fetchDataFailure } from '../action/tourAction';


// Các worker saga
function* fetchData() {
    try {
      const response = yield call(fetch, 'https://api.example.com/data');
      const data = yield call([response, 'json']);
      yield put(fetchDataSuccess(data));
    } catch (error) {
      yield put(fetchDataFailure(error));
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


