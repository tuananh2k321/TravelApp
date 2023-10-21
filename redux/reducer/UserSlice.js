import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {},
    dataRegister: {},
    user: {},
    token: ""
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addData: (state, action) => {
            //console.log("addData action: ", action.payload)
            state.data = {...action.payload}
            console.log("addData ", state.data)
        },
        addDataRegister: (state, action) => {
            //console.log("addData action: ", action.payload)
            state.dataRegister = {...action.payload}
            console.log("addDataRegister ", state.dataRegister)
        },
        addUser: (state, action) => {
            console.log("addUser action: ", action.payload)
            state.user = {...action.payload}
            console.log("addUser ", state.user)
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const {addUser, addData, setToken, addDataRegister} = UserSlice.actions

export default UserSlice.reducer