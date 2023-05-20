import React from 'react'
import { v4 as uuid } from 'uuid';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://642feb34c26d69edc886a350.mockapi.io/products'

export const getProduct = createAsyncThunk(
    'users/getUsers', async () => {
    const mockApi = url;
    const fetchData = await axios({
        method : 'get',
        url : mockApi,
        headers : {
            'Content-Type' : 'application/json'
        }
    })

    .then( res => {
        if (res.status !== 200){
            console.error("Error, no fetched data");
            return {}
        } else {
            console.log('response => ', res.data)
            return res.data;
        }
    })
    .catch(error => {
        console.log('error fetch ', error);
    })
    return fetchData
})

export const addProduct = createAsyncThunk('users/addUsers',
    async(param) => {
        const response = await axios.post(url, param)

        .then( res => {
            if (res.status !== 200){
                alert('Data Berhasil di Tambah')
                console.error("Error, no fetched data");
                return {}
            } else {
                console.log('response addUsers => ', res.data)
                return res.data;
            }
        })
        .catch(error => {
            console.log('error fetch ', error);
        })

        return response.data


    }
)

export const deleteProduct = createAsyncThunk(
    'users/deleteUsers', async (id) => {
    const mockApi = `${url}/${id}`
        const res = await axios.delete(
            mockApi
        )

        .then( res => {
            if (res.status !== 200){
                console.error("Error, no fetched data");
                return {}
            } else {
                alert('Data Berhasil di Hapus')
                console.log('response delete => ', res.data)
                return res.data;
            }
        })
        .catch(error => {
            console.log('error fetch ', error);
        })

        return res.data
})

export const editProduct = createAsyncThunk(
    'products/editProducts', async ([id, data]) => {
        const res = await axios.put(
            `${url}/${id}`, {data}
        )

        .then( res => {
            if (res.status !== 200){
                console.error("Error, no fetched data");
                return {}
            } else {
                console.log('response edit => ', res.data)
                return res.data;
            }
        })
        .catch(error => {
            console.log('error fetch ', error);
        })

        return res.data
})



const initialState = {
    data : [],
    type : '',
}

const usersSlice = createSlice({
    name : 'users',
    initialState : initialState,
    reducers : {},

    extraReducers :  {

        [getUsers.fulfilled] : (state, action) => {
            return{
                ...state,
                data : {
                    data : action.payload
                },
                type : action.type
            }
        },

        [addUsers.fulfilled] : ( state, action ) => {
            return {
                ...state,
                type: action.type
            }
        },

        [deleteUsers.fulfilled] : (state, action) => {
            return{
                ...state,
                data : state.data.filter((user) =>
                user.id !== action.payload.id,
                ),
                type : action.type
            }
            
        },

        [editUsers.fulfilled.type] : (state,action) => {
            return{
                ...state,
                data : state.data.map((product) => {
                    if (product.id === action.payload.id) {
                      product.users = action.payload.users;
                    }
                }),
                type : action.type
            }
        }

    }
})


export default productsSlice.reducer