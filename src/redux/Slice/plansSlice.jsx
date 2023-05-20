import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 

const plansSlice = createSlice({
    name:'plans',
    initialState,
    reducers:{
        addPlansFromApi: (state, action) => {
            return (state = action.payload)
        },
        addPlans : (state, action) => {
            return [...state, action.payload]
        },
        deletePlans : (state, action) => {
            return state.filter((plan) => plan.id !== action.payload)
        },
        editPlans: (state, action) => {
            return state.filter((plan) => plan.id !== action.payload)
        }
    }
})

export const {addPlansFromApi, addPlans, deletePlans, editPlans} = plansSlice.actions;

export default plansSlice.reducer;