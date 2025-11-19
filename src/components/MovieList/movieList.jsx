"use client";
import { BookFilled } from "@ant-design/icons";
import {
  Card,
  Col,
  Flex,
  Pagination,
  Row,
  Typography,
  Tooltip,
  message,
} from "antd";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/features/search/searchSlice";
import { bookmarkToggled } from "@/features/bookmarks/bookmarksSlice";
import { roboto } from "@/utils/fonts.mjs";

import styles from "./movieList.module.css";

const { Text, Title } = Typography;

export default function MovieList({ movies = [], totalResults = 0, isBookmarks = false }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);
  const currentPage = useSelector((s) => s.search.page);
  const [messageApi, contextHolder] = message.useMessage();

  const onPageChange = (page) => {
    dispatch(setFilter({ key: "page", value: String(page) }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onBookmarkClicked = (movie) => {
    const isBookmarked = bookmarks.some((b) => b.imdbID === movie.imdbID);
    dispatch(bookmarkToggled(movie));

    messageApi.open({
      type: isBookmarked ? "warning" : "success",
      content: isBookmarked
        ? `"${movie.Title}" removed from bookmarks`
        : `"${movie.Title}" added to bookmarks"`,
      style: {
        color: "#EFF1ED",
        fontWeight: 500,
      },
      duration: 2,
    });
  };

  return (
    <>
      {contextHolder}

      <Flex className={styles.container} vertical>
        <Row gutter={[32, 32]} justify="start" align="center" wrap>
          {movies.map((movie) => {
            const isBookmarked = bookmarks.some((b) => b.imdbID === movie.imdbID);
            const targetRoute =
              movie.Type === "series"
                ? `/tv/${movie.imdbID}`
                : `/movies/${movie.imdbID}`;

            return (
              <Col key={movie.imdbID} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  hoverable
                  className={`${styles.cardWrapper} ${styles.cardHover}`}
                  cover={
                    <Link href={targetRoute}>
                      <img
                        alt={movie.Title}
                        src={movie.Poster || "/default-movie.png"}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-movie.png";
                        }}
                        draggable={false}
                        className={styles.cardImage}
                      />
                    </Link>
                  }
                >
                  <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                    <Tooltip title={movie.Title}>
                      <Flex vertical className={styles.titleContainer}>
                        <Link href={targetRoute}>
                          <Title
                            level={4}
                            className={`${roboto.className} ${styles.titleText}`}
                          >
                            {movie.Title}
                          </Title>
                        </Link>
                        <Text className={styles.yearText}>{movie.Year}</Text>
                      </Flex>
                    </Tooltip>

                    <Tooltip title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}>
                      <BookFilled
                        className={styles.bookmarkIcon}
                        style={{ color: isBookmarked ? "#F2BB05" : "#ccc" }}
                        onClick={() => onBookmarkClicked(movie)}
                      />
                    </Tooltip>
                  </Flex>
                </Card>
              </Col>
            );
          })}
        </Row>

        {!isBookmarks && totalResults > 0 && (
          <Flex justify="center" className={styles.paginationWrapper}>
            <Pagination
              current={parseInt(currentPage, 10)}
              onChange={onPageChange}
              total={parseInt(totalResults, 10)}
              pageSize={10}
              showSizeChanger={false}
            />
          </Flex>
        )}
      </Flex>
    </>
  );
}
