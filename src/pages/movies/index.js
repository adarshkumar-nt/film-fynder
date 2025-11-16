"use client";
import ErrorComp from "@/components/Error/error";
import HorizontalList from "@/components/HorizontalList/horizontalList";
import MovieList from "@/components/MovieList/movieList";
import SectionHeader from "@/components/SectionHeader/sectionHeader";
import Spinner from "@/components/Spinner/spinner";
import { setFilter } from "@/features/search/searchSlice";
import { useSearchMovies } from "@/services/api/omdbApi";
import { featuredMovies } from "@/utils/movieData.mjs";
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
      <HorizontalList title={"Trending Movies"} movies={featuredMovies}/>
      <MovieList movies={data.Search} totalResults={data.totalResults} />
    </>
  );
}
