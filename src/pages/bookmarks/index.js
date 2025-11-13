"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Empty, Flex, Space } from "antd";
import MovieList from "@/components/movieList";
import { BookFilled } from "@ant-design/icons";
import { roboto } from "@/utils/fonts.mjs";

const { Title, Text } = Typography;

export default function Bookmark() {
  const [data, setData] = useState([]);
  const bookmarks = useSelector((state) => state.bookmarks);
  const hasBookmarks = bookmarks && bookmarks.length > 0;

  useEffect(() => {
    if (hasBookmarks) {
      setData(bookmarks);
    }
  }, [hasBookmarks]);

  return (
    <Flex vertical align="center" style={{ width: "100%", paddingTop: "16px" }}>
      {data.length > 0 && (
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            marginBottom: "32px",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Title
            level={2}
            className={roboto.className}
            style={{
              marginBottom: "8px",
              paddingTop: "16px",
            }}
          >
            Bookmarks
          </Title>

          <Text type="secondary">
            You have {bookmarks.length}{" "}
            {bookmarks.length === 1 ? "movie" : "movies"} bookmarked.
          </Text>
        </Flex>
      )}

      {data.length ? (
        <Flex style={{ width: "100%" }}>
          <MovieList movies={bookmarks} totalResults={bookmarks.length} />
        </Flex>
      ) : (
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            marginTop: "80px",
            minHeight: "50vh",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Empty
            description={
              <Space direction="vertical" align="center" size={4}>
                <Title
                  level={4}
                  style={{ marginBottom: 0 }}
                  className={roboto.className}
                >
                  You haven't bookmarked any movies yet
                </Title>

                <Text type="secondary">
                  Search and click the{" "}
                  <span style={{ color: "#F2BB05" }}>
                    <BookFilled /> bookmark icon
                  </span>{" "}
                  to save your favorites.
                </Text>
              </Space>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Flex>
      )}
    </Flex>
  );
}
