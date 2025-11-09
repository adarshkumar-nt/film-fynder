"use client";
import { useSearchMovies } from "@/services/api/omdbApi";
import MovieList from "@/components/movieList";

export default function Home() {
  const { data, isLoading } = useSearchMovies();

  if (isLoading) {
    return (
      <div>
        <h1>Loading movies.....</h1>
      </div>
    );
  }

  if (data.Response === "False") {
    return (
      <div>
        <h1>Failed to load movies: {data.Error}</h1>
      </div>
    );
  }

  return (
    <div>
      <MovieList movies={data.Search} totalResults={data.totalResults}/>
    </div>
  );
}
