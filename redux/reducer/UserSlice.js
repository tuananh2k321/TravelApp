import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {},
    dataRegister: {},
    dataSendOTP: {},
    dataVerifyOTP: {},
    dataChangePassword: {},
    dataEditProfile: {},
    user: null,
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
        addDataSendOTP: (state, action) => {
            //console.log("addData action: ", action.payload)
            state.dataSendOTP = {...action.payload}
            console.log("addDataOTP ", state.dataSendOTP)
        },
        addDataVerifyOTP: (state, action) => {
            //console.log("addData action: ", action.payload)
            state.dataVerifyOTP = {...action.payload}
            console.log("addDataVerifyOTP ", state.dataVerifyOTP)
        },
        addDataChangePassword: (state, action) => {
            //console.log("addData action: ", action.payload)
            state.dataChangePassword = {...action.payload}
            console.log("addDataChangePassword ", state.dataChangePassword)
        },
        addDataEditProfile: (state, action) => {
            //console.log("addData action: ", action.payload)
            state.dataEditProfile = {...action.payload}
            console.log("addDataEditProfile ", state.dataEditProfile)
        },
        addUser: (state, action) => {
            console.log("addUser action: ", action.payload)
            state.user = {...action.payload}
            console.log("addUser ", state.user)
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        resetUser: (state, action) => {
            state.data = {};
            state.dataRegister = {};
            state.dataSendOTP = {};
            state.dataVerifyOTP = {};
            state.dataChangePassword = {};
            state.dataEditProfile = {};
            state.user = null;
            state.token = "";
        }
    }
})

export const {addUser, addData, addDataSendOTP, setToken, 
    addDataRegister, addDataVerifyOTP, addDataChangePassword, addDataEditProfile, resetUser} = UserSlice.actions

export default UserSlice.reducer