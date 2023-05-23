import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 

const membershipsSlice = createSlice({
    name:'membership',
    initialState,
    reducers:{
        addMembershipsFromApi: (state, action) => {
            return (state = action.payload)
        },
        addMemberships : (state, action) => {
            return [...state, action.payload]
        },
        deleteMemberships : (state, action) => {
            return state.filter((membership) => membership.id !== action.payload)
        },
        editMemberships: (state, action) => {
            return state.filter((membership) => membership.id !== action.payload)
        }
    }
})

export const {addMemberships, addMembershipsFromApi, deleteMemberships, editMemberships} = membershipsSlice.actions;

export default membershipsSlice.reducer;