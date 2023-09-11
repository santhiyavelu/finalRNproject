import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {isLoggedin: false, user: null}, // Add user property to store user information
  reducers: {
    logIn: (state, action) => {
      state.isLoggedin = true;
      state.user = action.payload;
    },
    logOut: state => {
      state.isLoggedin = false;
      state.user = null; // Clear user information
    },
  },
});

export const {logIn, logOut} = userSlice.actions;

export default userSlice.reducer;
