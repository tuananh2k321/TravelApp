// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import searchHistoryReducer from '../reducer/SearchTourSlice';

const rootReducer = combineReducers({
  searchHistory: searchHistoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;