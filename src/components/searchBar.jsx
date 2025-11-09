"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setFilter, setSearchTerm } from "@/features/search/searchSlice";
import { useRouter } from "next/router";

const { Search } = Input;

const DEFAULT_SEARCH_TERM = "Joker";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const currentRoute = router.pathname;
  const routeType =
    currentRoute === "/movies"
      ? "movie"
      : currentRoute === "/tv"
      ? "series"
      : "";

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
      const trimmed = term.trim();
      dispatch(setFilter({ key: "page", value: "1" }));

      if (routeType) {
        dispatch(setFilter({ key: "type", value: routeType }));
      }

      if (trimmed === "") {
        dispatch(setSearchTerm(DEFAULT_SEARCH_TERM));
        return;
      }

      dispatch(setSearchTerm(trimmed))
    }, 700),
    [dispatch, routeType]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  return (
    <Search
      allowClear
      size="middle"
      value={searchQuery}
      onChange={handleChange}
      placeholder={
        routeType
          ? `Search ${routeType === "movie" ? "Movies" : "TV Shows"}...`
          : "Search Movies or Shows..."
      }
      enterButton={<SearchOutlined />}
      style={{
        maxWidth: "340px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
}
