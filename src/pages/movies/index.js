"use client";
import MovieList from "@/components/movieList";
import SectionHeader from "@/components/sectionHeader";
import Spinner from "@/components/spinner";
import { setFilter } from "@/features/search/searchSlice";
import { useSearchMovies } from "@/services/api/omdbApi";
import { roboto } from "@/utils/fonts.mjs";
import { Flex, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const { Title } = Typography;

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
      <Flex justify="center" align="center">
        <Title className={roboto.className}>Failed to load movies: {data.Error}</Title>
      </Flex>
    );
  }

  return (
    <>
      <SectionHeader title="Movies" image="/movie.png"/>
      <MovieList movies={data.Search} totalResults={data.totalResults} />
    </>
  );
}
