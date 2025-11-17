import { useSelector } from "react-redux";
import { Typography, Empty, Flex, Space } from "antd";
import MovieList from "@/components/MovieList/movieList";
import { BookFilled } from "@ant-design/icons";
import { roboto } from "@/utils/fonts.mjs";
import ClientOnly from "@/components/clientOnly";

import styles from "./bookmarks.module.css";

const { Title, Text } = Typography;

export default function Bookmark() {
  const bookmarks = useSelector((state) => state.bookmarks);
  const hasBookmarks = bookmarks && bookmarks.length > 0;

  return (
    <ClientOnly>
      <Flex
        vertical
        align="center"
        className={styles.container}
      >
        {hasBookmarks && (
          <Flex
            vertical
            align="center"
            justify="center"
            className={styles.header}
          >
            <Title
              className={`${roboto.className} ${styles.headerTitle}`}
            >
              Bookmarks
            </Title>

            <Text className={styles.headerSubtext}>
              You have {bookmarks.length}{" "}
              {bookmarks.length === 1 ? "movie" : "movies"} bookmarked.
            </Text>
          </Flex>
        )}

        {hasBookmarks ? (
          <Flex className={styles.fullWidth}>
            <MovieList
              movies={bookmarks}
              totalResults={bookmarks.length}
              isBookmarks
            />
          </Flex>
        ) : (
          <Flex
            vertical
            align="center"
            justify="center"
            className={styles.emptyContainer}
          >
            <Empty
              description={
                <Space direction="vertical" align="center" size={4}>
                  <Title
                    level={4}
                    className={roboto.className}
                    style={{ marginBottom: 0 }}
                  >
                    You haven't bookmarked any movies yet
                  </Title>

                  <Text type="secondary">
                    Search and click the{" "}
                    <span className={styles.highlightIcon}>
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
    </ClientOnly>
  );
}
