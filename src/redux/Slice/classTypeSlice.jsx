import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 

const classTypeSlice = createSlice({
    name:'classType',
    initialState,
    reducers:{
        addClassTypeFromApi: (state, action) => {
            return (state = action.payload)
        },
        addClassType : (state, action) => {
            return [...state, action.payload]
        },
        deleteClassType : (state, action) => {
            return state.filter((classType) => classType.id !== action.payload)
        },
        editClassType: (state, action) => {
            return state.filter((classType) => classType.id !== action.payload)
        }
    }
})

export const {addClassType, addClassTypeFromApi, deleteClassType, editClassType} = classTypeSlice.actions;

export default classTypeSlice.reducer; 