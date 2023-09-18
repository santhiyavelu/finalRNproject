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
    receiveMessage: (state, action) => {
      console.log('receiving a new message:', action.payload);
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
  },
});

export const {addMessage, receiveMessage} = messageSlice.actions;

export default messageSlice.reducer;
