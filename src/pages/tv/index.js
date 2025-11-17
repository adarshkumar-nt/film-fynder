"use client";

import ErrorComp from "@/components/Error/error";
import HorizontalList from "@/components/HorizontalList/horizontalList";
import MovieList from "@/components/MovieList/movieList";
import SectionHeader from "@/components/SectionHeader/sectionHeader";
import Spinner from "@/components/Spinner/spinner";
import { setFilter } from "@/features/search/searchSlice";
import { useSearchMovies } from "@/services/api/omdbApi";
import { roboto } from "@/utils/fonts.mjs";
import { featuredSeries } from "@/utils/movieData.mjs";
import { Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./tv.module.css";

const { Title } = Typography;

export default function TV() {
  const { data, isLoading } = useSearchMovies();
  const dispatch = useDispatch();

  const searchTerm = useSelector((s) => s.search.s);

  useEffect(() => {
    dispatch(setFilter({ key: "type", value: "series" }));
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  if (data.Response === "False") {
    return <ErrorComp message="Failed to load series" error={data.Error} />;
  }

  return (
    <>
      <SectionHeader title="TV" image="/series.png" />
      <HorizontalList title="Trending Series" movies={featuredSeries} />

      <Title level={2} className={styles.resultsTitle}>
        Showing TV series results for "{searchTerm}"
      </Title>

      <MovieList movies={data.Search} totalResults={data.totalResults} />
    </>
  );
}
