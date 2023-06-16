import { createSlice } from "@reduxjs/toolkit";

const initialState = []
// {
//     data:[],
//     loading:true,
//     error:null
// }

export const onlineClassSlice = createSlice({
    name: 'onlineClass',
    initialState,
    reducers:{
        addOnlineClass:(state, action) => {
            // state.onlineClass = [...state.onlineClass, action.payload]
            // state.push=[...state, action.payload]
            return [...state, action.payload]
            // return {...state, 
            //     data:action.payload,
            //     loading:false,
            //     error:null
            // }
        },
        updateOnlineClass:(state, action) => {
            // state = action.payload
            return  state = action.payload
            // return action.payload
        },
        deleteOnlineClass: (state, action) => {
            // state.onlineClass = state.onlineClass.filter((data) => data.onlineClassId !== action.payload);
            return state.filter((data) => data.onlineClassId !== action.payload)
        }
    }
})

export const {addOnlineClass, updateOnlineClass, deleteOnlineClass} = onlineClassSlice.actions

export default onlineClassSlice.reducer