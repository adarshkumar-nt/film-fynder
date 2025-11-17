"use client";
import Spinner from "@/components/Spinner/spinner";
import { useMovieDetail } from "@/services/api/omdbApi";
import { Flex, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";
import MovieDetail from "@/components/MovieDetail/movieDetail";
import ErrorComp from "@/components/Error/error";

const { Title } = Typography;

export default function MovieDetails() {
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
    return <ErrorComp message="Failed to load movie"/>
  }

  return <MovieDetail movie={data} />;
}
