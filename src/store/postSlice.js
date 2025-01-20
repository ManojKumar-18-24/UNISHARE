import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    posts : null
}

export const postSlice = createSlice({
    name : 'post',
    initialState,
    reducers : {
        getPosts : (state,action) => {
            state.posts = action.payload;
        },
        deletePosts : (state) => {
            state.posts = null
        }
    }
})

export const postreducer = postSlice.reducer ;

export const {getPosts, deletePosts} = postSlice.actions;