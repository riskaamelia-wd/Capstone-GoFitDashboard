import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 

const paymentMethodsSlice = createSlice({
    name:'paymentMethods',
    initialState,
    reducers:{
        addPaymentMethodsFromApi: (state, action) => {
            return (state = action.payload)
        },
        addPaymentMethods : (state, action) => {
            return [...state, action.payload]
        },
        deletePaymentMethods : (state, action) => {
            return state.filter((paymentMethods) => paymentMethods.id !== action.payload)
        },
        editPaymentMethods: (state, action) => {
            return state.filter((paymentMethods) => paymentMethods.id !== action.payload)
        }
    }
})

export const {addPaymentMethods, addPaymentMethodsFromApi, deletePaymentMethods, editPaymentMethods} = paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer;