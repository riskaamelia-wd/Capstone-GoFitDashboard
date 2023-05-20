import { createSlice } from "@reduxjs/toolkit";

const initialState = [] 

const transactionSlice = createSlice({
    name:'transactions',
    initialState,
    reducers:{
        addTransactionsFromApi: (state, action) => {
            return (state = action.payload)
        },
        addTransactions : (state, action) => {
            return [...state, action.payload]
        },
        deleteTransactions : (state, action) => {
            return state.filter((transaction) => transaction.id !== action.payload)
        },
        editTransactions: (state, action) => {
            return state.filter((transaction) => transaction.id !== action.payload)
        }
    }
})

export const {addTransactions, addTransactionsFromApi, deleteTransactions, editTransactions} = transactionSlice.actions;

export default transactionSlice.reducer;