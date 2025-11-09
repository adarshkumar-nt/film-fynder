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
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/features/search/searchSlice";
import { bookmarkToggled } from "@/features/bookmarks/bookmarksSlice";

const { Text } = Typography;

export default function MovieList({ movies = [], totalResults = 0 }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);

  const [messageApi, contextHolder] = message.useMessage();

  const onPageChange = (page) => {
    dispatch(setFilter({ key: "page", value: String(page) }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onBookmarkClicked = (movie) => {
    const isBookmarked = bookmarks.some((b) => b.imdbID === movie.imdbID);
    dispatch(bookmarkToggled(movie));

    if (!isBookmarked) {
      messageApi.open({
        type: "success",
        content: `"${movie.Title}" added to bookmarks`,
      });
    } else {
      messageApi.open({
        type: "warning",
        content: `"${movie.Title}" removed from bookmarks`,
      });
    }
  };

  return (
    <>
      {contextHolder}

      <Row gutter={[16, 20]} justify="start">
        {movies.map((movie) => {
          const isBookmarked = bookmarks.some((b) => b.imdbID === movie.imdbID);
          return (
            <Col
              key={movie.imdbID}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                hoverable
                cover={
                  <img
                    alt={movie.Title}
                    src={movie.Poster || "/default-movie.png"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-movie.png";
                    }}
                    draggable={false}
                    style={{
                      height: "360px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                }
                style={{
                  width: "100%",
                  maxWidth: "280px",
                  borderRadius: "10px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                  transition: "transform 0.25s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <Flex
                  justify="space-between"
                  align="center"
                  style={{ width: "100%" }}
                >
                  <Tooltip title={movie.Title}>
                    <Flex
                      vertical
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "190px",
                      }}
                    >
                      <Text strong style={{ fontSize: "15px" }}>
                        {movie.Title}
                      </Text>
                      <Text type="secondary" style={{ fontSize: "13px" }}>
                        {movie.Year}
                      </Text>
                    </Flex>
                  </Tooltip>

                  <BookFilled
                    style={{
                      color: isBookmarked ? "#fadb14" : "#ccc",
                      fontSize: "22px",
                      cursor: "pointer",
                      transition: "transform 0.2s ease, color 0.2s ease",
                    }}
                    onClick={() => onBookmarkClicked(movie)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </Flex>
              </Card>
            </Col>
          );
        })}
      </Row>

      {totalResults > 0 && (
          <Pagination
            current={parseInt(
              useSelector((s) => s.search.page),
              10
            )}
            onChange={onPageChange}
            align="center"
            total={parseInt(totalResults, 10)}
            pageSize={10}
            showSizeChanger={false}
            style={{marginTop: "24px"}}
          />
      )}
    </>
  );
}
