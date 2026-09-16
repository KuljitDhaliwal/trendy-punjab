import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    isAuthLoading: true
}


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setIsAuthLoading: (state, action) => {
            state.isAuthLoading = action.payload
        }
    }
})


export const {
    setAccessToken,
    setIsAuthLoading
} = authSlice.actions

export default authSlice.reducer