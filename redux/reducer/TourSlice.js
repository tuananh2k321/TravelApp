import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    ratingTours: [],
    tour: {},
}

export const TourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        addTours: (state, action) => {
            console.log("TourSlice action: ", action.payload)
            state.ratingTours = {...action.payload}
        },
    }
})

export const {addTours} = TourSlice.actions

export default TourSlice.reducer