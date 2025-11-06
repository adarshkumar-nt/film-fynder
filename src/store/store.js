import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer from "@/features/bookmarks/bookmarksSlice"

export const store = configureStore({
    reducer: {
        bookmarks: bookmarksReducer
    }
})