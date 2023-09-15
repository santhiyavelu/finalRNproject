import {createSlice} from '@reduxjs/toolkit';

export const localeSlice = createSlice({
  name: 'localeSlice',
  initialState: {language: 'en'},
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
      console.log(state.language, 'slice');
    },
  },
});

export const {changeLanguage} = localeSlice.actions;

export default localeSlice.reducer;
