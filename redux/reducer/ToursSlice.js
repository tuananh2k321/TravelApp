import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tuor: [],
    loading: false,
    error: null,
}

const tuorReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_DATA_SUCCESS':
        return { ...state, tuor: action.data, loading: false, error: null };
      case 'FETCH_DATA_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };


export default tuorReducer