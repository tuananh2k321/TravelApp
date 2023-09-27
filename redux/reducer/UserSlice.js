import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    token: "",
    isLoading: false
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            console.log("UserSlice action: ", action.payload)
            state.user = {...action.payload}
            console.log("UserSlice user", state.user)
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const {addUser, setLoading, setToken} = UserSlice.actions

export default UserSlice.reducer