import { createSlice } from '@reduxjs/toolkit';

const loginRedux = createSlice({
    name: 'login',
    initialState: {
        isToken: false,
    },
    reducers: {
        setToken(state, action) {
            state.isToken = action.payload;
        },
    },
});

export const {
    setToken,
} = loginRedux.actions;
export default loginRedux.reducer;
