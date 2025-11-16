"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearchTerm } from "@/features/search/searchSlice";
import styles from "./searchBar.module.css"

const { Search } = Input;

const DEFAULT_SEARCH_TERM = "Joker";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const getSearch = useSelector(s => s.search.s)
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchQuery(getSearch)
  }, [])

  const debounce = useMemo(
    () =>
      (func, delay = 700) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => func.apply(null, args), delay);
        };
      },
    []
  );

  const handleSearch = useCallback(
    debounce((term) => {
      const trimmed = term.trim().replace(/\s/g, "+");
      dispatch(setFilter({ key: "page", value: "1" }));
      if (trimmed === "") {
        dispatch(setSearchTerm(DEFAULT_SEARCH_TERM));
        return;
      }
      dispatch(setSearchTerm(trimmed));
    }, 700),
    [dispatch]
  );
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  return (
    <Search
      allowClear
      size="large"
      value={searchQuery}
      onChange={handleChange}
      placeholder="Search Movies or Shows..."
      enterButton={<SearchOutlined />}
      className={styles.searchBar}
    />
  );
}
