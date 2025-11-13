"use client";
import Spinner from "@/components/spinner";
import { useMovieDetail } from "@/services/api/omdbApi";
import { useRouter } from "next/router";
import React from "react";
import MovieDetail from "@/components/movieDetail";
import Error from "@/components/error";

export default function TVDetails() {
  const router = useRouter();

  // Wait until the router is ready
  const isReady = router.isReady;
  const movieId = router.query.id;

  // Only fetch when router is ready and id is defined
  const { data, isLoading, isError } = useMovieDetail({
    i: isReady ? movieId : undefined,
  });

  if (!isReady || isLoading) return <Spinner />;

  if (isError || !data || data.Response === "False") {
    return (
      <Error message={"Failed to load series"}/>
    );
  }

  return <MovieDetail movie={data} />;
}
