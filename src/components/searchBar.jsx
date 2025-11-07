"use client";
import React, { useCallback, useState } from "react";
import { Button, Input, Space } from "antd";
import { setFilter, setSearchTerm } from "@/features/search/searchSlice";
import { useDispatch } from "react-redux";

const { Search } = Input;

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch()
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    }
  }

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      console.log("Fetching results for ", searchTerm);
        if(searchTerm){
          dispatch(setFilter({key:"page", value: "1"}))
          dispatch(setSearchTerm(searchTerm));
        }
    }, 500),
    []
  );

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    handleSearch(e.target.value)
  }
  return (
    <div>
      <Space.Compact style={{ width: "100%" }}>
        <Search value={searchQuery} onChange={handleChange}/>
      </Space.Compact>
    </div>
  );
}
