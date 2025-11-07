import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    s: "Joker",
    type: "",
    y: "",
    page: "1"
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            console.log(action.payload);
            state.s = action.payload
        },
        setFilter: (state, action) => {
            const {key, value} = action.payload
            console.log(key, value);
            state[key] = value
        },
        resetFilters: () => {
            state["type"] = ""
            state["y"] = ""
            state["page"] = "1"
        }
    }
})

export const {setSearchTerm, setFilter, resetFilters} = searchSlice.actions

export default searchSlice.reducer