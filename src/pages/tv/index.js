"use client";

import MovieList from "@/components/movieList";
import { setFilter } from "@/features/search/searchSlice";
import { useSearchMovies } from "@/services/api/omdbApi";
import { BookFilled } from "@ant-design/icons";
import { Card, Col, Flex, Row, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const { Title } = Typography;
const { Meta } = Card;

export default function TV() {
  const { data, isLoading } = useSearchMovies();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFilter({ key: "type", value: "series" }));
  }, []);
  if (isLoading) {
    return <div>Series are loading...</div>;
  }
  if (data.Response === "False") {
    return (
      <div>
        <h1>Failed to load series: {data.Error}</h1>
      </div>
    );
  }
  return (
    <div>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Series
      </Title>
      <MovieList movies={data.Search} totalResults={data.totalResults}/>
    </div>
  );
}
