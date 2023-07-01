import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    isLoading: false
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            console.log("action", action.payload)
            state.user = {...action.payload}
            console.log("user", state.user)
        }
    }
})

export const {addUser} = UserSlice.actions

export default UserSlice.reducer