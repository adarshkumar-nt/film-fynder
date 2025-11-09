"use client";
import MovieList from "@/components/movieList";
import { setFilter } from "@/features/search/searchSlice";
import { useSearchMovies } from "@/services/api/omdbApi";
import { Typography } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const { Title } = Typography;

export default function Movies() {
  const { data, isLoading } = useSearchMovies();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilter({ key: "type", value: "movie" }));
  }, [dispatch]);

  if (isLoading) return <div>Movies are loading...</div>;

  if (data.Response === "False") {
    return (
      <div>
        <h1>Failed to load movies: {data.Error}</h1>
      </div>
    );
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Movies
      </Title>
      <MovieList movies={data.Search} totalResults={data.totalResults} />
    </div>
  );
}
