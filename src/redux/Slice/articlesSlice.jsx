import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const initialState = []

export const articlesSlice = createSlice({
    name: 'article',
    initialState,
    reducers:{
        addArticle:(state, action) => {
            return [...state, action.payload]
        },
        updateArticle:(state, action) => {
            return state = action.payload
        },
        deleteArticle: (state, action) => {
            return state.filter((data) => data.articleId !== action.payload)
        }
    }
})

export const {addArticle, updateArticle, deleteArticle} = articlesSlice.actions

export default articlesSlice.reducer