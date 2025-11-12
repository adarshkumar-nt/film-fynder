import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer, {bookmarksMiddleware} from "@/features/bookmarks/bookmarksSlice"
import searchReducer from "@/features/search/searchSlice"

export const store = configureStore({
    reducer: {
        bookmarks: bookmarksReducer,
        search: searchReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookmarksMiddleware)
})