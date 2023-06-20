import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token_user: "",
};

const usersSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      state.token_user = action.payload;
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
