import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

const usersSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      const data = {
        email: action.payload.email,
        password: action.payload.password,
      };
      return { ...state, data };
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
