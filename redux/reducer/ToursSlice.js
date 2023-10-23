import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tours: [],
    // isLoading: false
}

export const ToursSlice = createSlice({
    name: 'tours',
    initialState,
    reducers: {
        getTours: (state, action) => {
            console.log("ToursSlice action: ", action.payload)
            state.tours = {...action.payload}
            // console.log("ToursSlice user", state.tours)
            // state.isLoading = false;
        },
    }
})

export const {getTours} = ToursSlice.actions

export default UserSlice.reducer