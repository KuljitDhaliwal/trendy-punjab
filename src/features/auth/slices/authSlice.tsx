import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    isAuthLoading: true,
    isAuthInitialized: false
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
        },
        setLogout: (state) => {
            state.accessToken = null
        },
        setIsAuthInitialized: (state, action) => {
            state.isAuthInitialized = action.payload
        },
    }
})


export const {
    setAccessToken,
    setIsAuthLoading,
    setLogout,
    setIsAuthInitialized
} = authSlice.actions

export default authSlice.reducer