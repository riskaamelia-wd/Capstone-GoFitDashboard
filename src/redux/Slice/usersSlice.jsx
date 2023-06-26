import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token_user: "",
  data_user: null,
};

const usersSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addRemember: (state, action) => {
      state.token_user = action.payload;
    },
    addUser: (state, action) => {
      state.data_user = action.payload;
    },
  },
});

export const { addUser, addRemember } = usersSlice.actions;

export default usersSlice.reducer;
