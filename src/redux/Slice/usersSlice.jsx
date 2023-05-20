import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 
// {    allUsers: []}

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        addUsersFromApi: (state, action) => {
            // if(state.allUsers.length === 0){
            //     state.allUsers = action.payload
            // }
            return (state = action.payload)
        },
        addUsers : (state, action) => {
            return [...state, action.payload]
        },
        deleteUsers : (state, action) => {
            return state.filter((user) => user.id !== action.payload)
        },
        editUsers: (state, action) => {
            return state.filter((user) => user.id !== action.payload)
        }
    }
})

export const {addUsers, addUsersFromApi, deleteUsers, editUsers} = usersSlice.actions;

export default usersSlice.reducer;