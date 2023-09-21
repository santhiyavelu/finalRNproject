import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  channelMessages: {},
};

const messageSlice = createSlice({
  name: 'channelMessages',
  initialState,
  reducers: {
    addMessageToChannel: (state, action) => {
      const {channel, text, author} = action.payload;
      // Add the message to the corresponding channel in state
      console.log(channel, text, author, 'message from stores');
      if (!state.channelMessages[channel]) {
        state.channelMessages[channel] = [];
      }
      state.channelMessages[channel].push(text);
    },
    clearMessages: (state, action) => {
      const {channel} = action.payload;
      state.channelMessages[channel] = [];
    },
  },
});

export const {addMessageToChannel, clearMessages} = messageSlice.actions;
export default messageSlice.reducer;
