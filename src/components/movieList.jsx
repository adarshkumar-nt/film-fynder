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
        : `"${movie.Title}" added to bookmarks`,
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
      <Flex style={{ paddingInline: "48px", width: "100%" }} vertical>
        <Row gutter={[64, 64]} justify="start" align="center" wrap>
          {movies.map((movie) => {
            const isBookmarked = bookmarks.some(
              (b) => b.imdbID === movie.imdbID
            );
            const targetRoute =
              movie.Type === "series"
                ? `/tv/${movie.imdbID}`
                : `/movies/${movie.imdbID}`;

            return (
              <Col key={movie.imdbID} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  hoverable
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.5)",
                    transition: "transform 0.25s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-4px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                  cover={
                    <Link href={targetRoute} passHref>
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
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                      />
                    </Link>
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
                          whiteSpace: "nowrap",
                          maxWidth: "70%",
                        }}
                      >
                        <Link href={targetRoute} passHref>
                          <Title
                            level={4}
                            className={roboto.className}
                            style={{
                              margin: 0,
                              color: "#EFF1ED",
                            }}
                          >
                            {movie.Title}
                          </Title>
                        </Link>
                        <Text style={{ fontSize: "14px" }}>{movie.Year}</Text>
                      </Flex>
                    </Tooltip>
                    <Tooltip title={isBookmarked? "Remove from bookmarks": "Add to bookmarks"}>
                      <BookFilled
                        style={{
                          color: isBookmarked ? "#F2BB05" : "#ccc",
                          fontSize: "22px",
                          cursor: "pointer",
                          transition: "transform 0.2s ease, color 0.2s ease",
                        }}
                        onClick={() => onBookmarkClicked(movie)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.2)";
                        }}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </Tooltip>
                  </Flex>
                </Card>
              </Col>
            );
          })}
        </Row>

        {!isBookmarks && totalResults > 0 && (
          <Flex justify="center" style={{ marginTop: "32px" }}>
            <Pagination
              current={parseInt(
                currentPage,
                10
              )}
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
