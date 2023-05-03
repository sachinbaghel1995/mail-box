import { createSlice } from '@reduxjs/toolkit';

const initialState = { mailData: [], firstTime: true};

const mailSlice = createSlice({
  name: 'mail',
  initialState: initialState,
  reducers: {
    firstTime(state, action) {
      state.firstTime = action.payload;
    },
   
    add(state, action) {
      state.mailData = [action.payload, ...state.mailData];
    //   console.log(state.mails);
    },
   
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;