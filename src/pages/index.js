"use client";
import { useSearchMovies } from "@/services/api/omdbApi";
import { Card, Row, Col, Pagination, Badge, Flex } from "antd";
import { Geist, Geist_Mono } from "next/font/google";
import { BookFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { bookmarkToggled } from "@/features/bookmarks/bookmarksSlice";
import { setFilter } from "@/features/search/searchSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "@/components/searchBar";

const { Meta } = Card;

export default function Home() {
  const { data, isLoading, isError, error, isFetched } = useSearchMovies();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  const onBookmarkClicked = (movie) => {
    dispatch(bookmarkToggled(movie));
  };

  const onPageChanged = (page) => {
    dispatch(setFilter({ key: "page", value: page }));
    setCurrentPage(page);
  };

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
    <div className={``}>
      <SearchBar/>
      <Row gutter={32}>
        {data.Search?.map((movie) => (
          <Col span={6} style={{ padding: "16px" }} key={movie.imdbID}>
            <Card
              hoverable
              cover={
                <img
                  draggable={false}
                  alt={movie.title}
                  src={movie.Poster ? movie.Poster : "/default-movie.png"}
                  style={{ height: "350px", objectFit: "cover" }}
                />
              }
            >
              <Flex justify="space-around" align="center" gap="middle">
                <Meta title={<span style={{fontSize: "18px"}}>{movie.Title}</span>} description={movie.Year}/>
                <BookFilled
                  style={{ color: "#efee45", fontSize: "24px" }}
                  onClick={() => onBookmarkClicked(movie)}
                />
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        align="center"
        current={currentPage}
        onChange={onPageChanged}
        total={21}
      />
    </div>
  );
}
