import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 

const classCategorySlice = createSlice({
    name:'classCategory',
    initialState,
    reducers:{
        addClassCategoryFromApi: (state, action) => {
            return (state = action.payload)
        },
        addClassCategory : (state, action) => {
            return [...state, action.payload]
        },
        deleteClassCategory : (state, action) => {
            return state.filter((classCategory) => classCategory.id !== action.payload)
        },
        editClassCategory: (state, action) => {
            return state.filter((classCategory) => classCategory.id !== action.payload)
        }
    }
})

export const {addClassCategory, addClassCategoryFromApi, deleteClassCategory, editClassCategory} = classCategorySlice.actions;

export default classCategorySlice.reducer; 