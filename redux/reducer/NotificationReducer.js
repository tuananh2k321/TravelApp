const initialState = [];

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
        let notifications = [...state.notification];
        notifications.push(action.payload);
        return {...state, notifications: notifications}
    default:
      return state;
  }
};

export default notificationReducer;