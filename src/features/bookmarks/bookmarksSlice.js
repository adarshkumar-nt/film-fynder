import { createSlice } from "@reduxjs/toolkit";

const loadBookmarks = () => {
  if(typeof window === "undefined"){
    return [];
  }
  try {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = loadBookmarks();

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

export const bookmarksMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (bookmarkToggled.match(action)) {
    try {
      localStorage.setItem("bookmarks", JSON.stringify(store.getState().bookmarks));
    } catch (e) {
      console.error("Failed to save bookmarks:", e);
    }
  }
  return result;
};

export const {bookmarkToggled} = bookmarksSlice.actions
export default bookmarksSlice.reducer
