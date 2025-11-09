"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Typography, Empty, Flex } from "antd";
import MovieList from "@/components/movieList";

const { Title, Text } = Typography;

export default function Bookmark() {
  const bookmarks = useSelector((state) => state.bookmarks);

  const hasBookmarks = bookmarks && bookmarks.length > 0;

  return (
    <div style={{ minHeight: "80vh" }}>
      <Flex
        justify="space-between"
        align="center"
        wrap
        style={{ marginBottom: "24px" }}
      >
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Bookmarks
          </Title>
          {hasBookmarks && (
            <Text type="secondary">
              You have {bookmarks.length}{" "}
              {bookmarks.length === 1 ? "movie" : "movies"} bookmarked.
            </Text>
          )}
        </div>
      </Flex>

      {hasBookmarks ? (
        <MovieList movies={bookmarks} totalResults={bookmarks.length} />
      ) : (
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            marginTop: "80px",
            minHeight: "50vh",
          }}
        >
          <Empty
            description={
              <div>
                <Title level={4} style={{ marginBottom: "8px" }}>
                  You haven't bookmarked any movies yet
                </Title>
                <Text type="secondary">
                  Search and click the{" "}
                  <span style={{ color: "#fadb14" }}>bookmark icon</span> to
                  save your favorites.
                </Text>
              </div>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Flex>
      )}
    </div>
  );
}
