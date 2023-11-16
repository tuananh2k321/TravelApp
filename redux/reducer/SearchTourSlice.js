// searchHistoryReducer.js
const initialState = [];

const searchHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_HISTORY':
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default searchHistoryReducer;