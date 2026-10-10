import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    isAuthLoading: true,
    isAuthInitialized: false,
    admin: {
        email: '',
        fullname: '',
        role: ''
    },
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
            state.admin = {
                email: '',
                fullname: '',
                role: ''
            }
        },
        setIsAuthInitialized: (state, action) => {
            state.isAuthInitialized = action.payload
        },
        setAdmin: (state, action) => {
            state.admin = action.payload
        }
    }
})


export const {
    setAccessToken,
    setIsAuthLoading,
    setLogout,
    setIsAuthInitialized,
    setAdmin,
} = authSlice.actions

export default authSlice.reducer