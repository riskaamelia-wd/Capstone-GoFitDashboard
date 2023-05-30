import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 

const instructorsSlice = createSlice({
    name:'instructor',
    initialState,
    reducers:{
        addInstructorFromApi: (state, action) => {
            return (state = action.payload)
        },
        addInstructor : (state, action) => {
            return [...state, action.payload]
        },
        deleteInstructor : (state, action) => {
            return state.filter((instructor) => instructor.id !== action.payload)
        },
        editInstructor: (state, action) => {
            return state.filter((instructor) => instructor.id !== action.payload)
        }
    }
})

export const {addInstructor, addInstructorFromApi, deleteInstructor, editInstructor} = instructorsSlice.actions;

export default instructorsSlice.reducer; 