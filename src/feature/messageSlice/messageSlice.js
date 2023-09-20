import {createSlice} from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'messageSlice',
  initialState: {messages: []}, // Add user property to store user information
  reducers: {
    addMessage: (state, action) => {
      console.log('Adding a new message:', action.payload);
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    resetMessage: state => {
      return {messages: []}; // Reset the messages property to an empty array
    },
  },
});

export const {addMessage, resetMessage} = messageSlice.actions;

export default messageSlice.reducer;
