import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 

const newsletterSlice = createSlice({
    name:'newsletter',
    initialState,
    reducers:{
        addNewsletterFromApi: (state, action) => {
            return (state = action.payload)
        },
        addNewsletter : (state, action) => {
            return [...state, action.payload]
        },
        deleteNewsletter : (state, action) => {
            return state.filter((newsletter) => newsletter.id !== action.payload)
        },
        editNewsletter: (state, action) => {
            return state.filter((newsletter) => newsletter.id !== action.payload)
        }
    }
})

export const {addNewsletter, addNewsletterFromApi, deleteNewsletter, editNewsletter} = newsletterSlice.actions;

export default newsletterSlice.reducer;