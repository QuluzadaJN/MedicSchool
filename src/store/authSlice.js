import cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            localStorage.setItem('authTime', (new Date()))
            cookies.set("Authorization", JSON.parse(localStorage.getItem('userInfo'))?.headers?.token?.[0], {
                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            });
        },
        logOut: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('authTime');
            cookies.remove("Authorization");
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
