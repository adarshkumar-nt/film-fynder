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

export default function TV() {
  const { data, isLoading } = useSearchMovies();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFilter({ key: "type", value: "series" }));
  }, []);
  if (isLoading) {
    return (
      <Spinner/>
    );
  }
  if (data.Response === "False") {
    return (
      <Flex>
        <Title className={roboto.className}>Failed to load series: {data.Error}</Title>
      </Flex>
    );
  }
  return (
    <>
      <SectionHeader title="TV" image="/series.png"/>
      <MovieList movies={data.Search} totalResults={data.totalResults} />
    </>
  );
}
