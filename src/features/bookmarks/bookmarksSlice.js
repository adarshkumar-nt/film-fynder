import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        bookmarkToggled(state, action){
            if(!state.some(movie => movie.imdbID === action.payload.imdbID)){
                state.push(action.payload);
            }
            else{
                return state.filter(movie => movie.imdbID !== action.payload.imdbID)
            }    
        }
    }
})

export const {bookmarkToggled} = bookmarksSlice.actions
export default bookmarksSlice.reducer
