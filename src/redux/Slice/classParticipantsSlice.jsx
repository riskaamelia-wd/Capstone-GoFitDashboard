import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 

const classParticipantsSlice = createSlice({
    name:'classParticipant',
    initialState,
    reducers:{
        addClassParticipantsFromApi: (state, action) => {
            return (state = action.payload)
        },
        addClassParticipants : (state, action) => {
            return [...state, action.payload]
        },
        deleteClassParticipants : (state, action) => {
            return state.filter((classParticipant) => classParticipant.id !== action.payload)
        },
        editClassParticipants: (state, action) => {
            return state.filter((classParticipant) => classParticipant.id !== action.payload)
        }
    }
})

export const {addClassParticipants, addClassParticipantsFromApi, deleteClassParticipants, editClassParticipants} = classParticipantsSlice.actions;

export default classParticipantsSlice.reducer; 