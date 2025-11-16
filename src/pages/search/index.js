"use client";

import { useSearchMovies } from "@/services/api/omdbApi";
import { Flex, Typography } from "antd";
import React from "react";
import SearchBar from "@/components/SearchBar/searchBar";
import Spinner from "@/components/Spinner/spinner";
import MovieList from "@/components/MovieList/movieList";
import ErrorComp from "@/components/Error/error";

const { Title } = Typography;

export default function SearchPage() {
  const { data, isLoading } = useSearchMovies();
  return (
    <Flex vertical align="center" gap={24}>
      <SearchBar />
      {isLoading ? <Spinner /> : data.Response === "False" ? (
        <ErrorComp
          message="Failed to load movie or series"
          error={data.Error}
        />
      ) : (
        <>
          <Title level={2}>Showing {data.totalResults} results</Title>
          <MovieList movies={data.Search} totalResults={data.totalResults} />
        </>
        
      )}
    </Flex>
  );
}
