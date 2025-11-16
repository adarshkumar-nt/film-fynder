"use client";
import ErrorComp from "@/components/error";
import MovieList from "@/components/movieList";
import SectionHeader from "@/components/sectionHeader";
import Spinner from "@/components/spinner";
import { setFilter } from "@/features/search/searchSlice";
import { useSearchMovies } from "@/services/api/omdbApi";
import { Typography } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Movies() {
  const { data, isLoading } = useSearchMovies();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilter({ key: "type", value: "movie" }));
  }, [dispatch]);

  if (isLoading)
    return (
      <Spinner/>
    );

  if (data.Response === "False") {
    return (
      <ErrorComp message="failed to load movies" error={data.Error}/>
    );
  }

  return (
    <>
      <SectionHeader title="Movies" image="/movie-theatre.jpg"/>
      <MovieList movies={data.Search} totalResults={data.totalResults} />
    </>
  );
}
