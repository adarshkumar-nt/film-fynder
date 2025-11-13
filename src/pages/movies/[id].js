"use client";
import Spinner from "@/components/spinner";
import { useMovieDetail } from "@/services/api/omdbApi";
import { Flex, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";
import MovieDetail from "@/components/movieDetail";
import { roboto } from "@/utils/fonts.mjs";
import Error from "@/components/error";

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
    return (
      <Flex justify="center" align="center">
        <Title className={roboto.className}>Failed to load movie</Title>
      </Flex>
    );
  }

  return <MovieDetail movie={data} />;
}
