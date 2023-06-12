import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 

const classesSlice = createSlice({
    name:'classes',
    initialState,
    reducers:{
        addClassesFromApi: (state, action) => {
            return (state = action.payload)
        },
        addClasses : (state, action) => {
            return [...state, action.payload]
        },
        deleteClasses : (state, action) => {
            return state.filter((classes) => classes.id !== action.payload)
        },
        editClasses: (state, action) => {
            return state.filter((classes) => classes.id !== action.payload)
        }
    }
})

export const {addClasses, addClassesFromApi, deleteClasses, editClasses} = classesSlice.actions;

export default classesSlice.reducer; 