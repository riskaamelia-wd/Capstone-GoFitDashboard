import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token_jwt: "",
};

const tokenSlices = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token_jwt = action.payload;
    },
  },
});

export const { addToken } = tokenSlices.actions;

export default tokenSlices.reducer;