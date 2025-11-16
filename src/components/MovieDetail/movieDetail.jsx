"use client";

import {
  Flex,
  Typography,
  Image,
  Tag,
  Divider,
  Space,
  Button,
  Skeleton,
  Tooltip,
  message,
} from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  StarFilled,
  ArrowLeftOutlined,
  BookFilled,
} from "@ant-design/icons";
import { roboto } from "@/utils/fonts.mjs";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkToggled } from "@/features/bookmarks/bookmarksSlice";
import { useRouter } from "next/router";

import styles from "./movieDetail.module.css";

const { Title, Text } = Typography;

export default function MovieDetail({ movie, loading }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const bookmarks = useSelector((state) => state.bookmarks);
  const isBookmarked = bookmarks.some((b) => b.imdbID === movie?.imdbID);

  const onBookmarkClicked = () => {
    dispatch(bookmarkToggled(movie));

    messageApi.open({
      type: isBookmarked ? "warning" : "success",
      content: isBookmarked
        ? `"${movie.Title}" removed from bookmarks`
        : `"${movie.Title}" added to bookmarks`,
      style: { color: "#EFF1ED", fontWeight: 500 },
      duration: 2,
    });
  };

  if (loading || !movie) {
    return (
      <Flex justify="center" className={styles.loaderWrapper}>
        <Skeleton active avatar paragraph={{ rows: 10 }} style={{ width: "80%" }} />
      </Flex>
    );
  }

  return (
    <>
      {contextHolder}

      <Flex justify="center" className={styles.pageContainer}>
        <Flex wrap gap="large" className={styles.innerContainer}>
          <Flex className={styles.posterWrapper}>
            <Image
              src={
                movie.Poster && movie.Poster !== "N/A"
                  ? movie.Poster
                  : "/default-movie.png"
              }
              alt={movie.Title}
              preview={false}
              width={280}
              height={420}
              className={styles.posterImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-movie.png";
              }}
            />
          </Flex>
          <Flex vertical className={styles.detailsWrapper}>
            <Flex className={styles.topBar}>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => router.back()}
                className={styles.backButton}
              >
                Back
              </Button>

              <Tooltip title={isBookmarked ? "Remove bookmark" : "Add to bookmarks"}>
                <BookFilled
                  onClick={onBookmarkClicked}
                  className={styles.bookmarkIcon}
                  style={{ color: isBookmarked ? "#F2BB05" : "#ccc" }}
                />
              </Tooltip>
            </Flex>

            <Title level={2} className={`${roboto.className} ${styles.title}`}>
              {movie.Title}
            </Title>

            <Space size="middle" wrap>
              {movie.Year && (
                <Tag
                  icon={<CalendarOutlined />}
                  className={styles.detailTag}
                >
                  {movie.Year}
                </Tag>
              )}

              {movie.Runtime && (
                <Tag
                  icon={<ClockCircleOutlined />}
                  className={styles.detailTag}
                >
                  {movie.Runtime}
                </Tag>
              )}

              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <Tag
                  icon={<StarFilled />}
                  className={styles.ratingTag}
                >
                  {movie.imdbRating}/10
                </Tag>
              )}
            </Space>

            <Divider className={styles.divider} />

            <Space direction="vertical" size="small">
              <Text>
                <Text strong className={styles.sectionLabel}>Genre:</Text> {movie.Genre}
              </Text>
              <Text>
                <Text strong className={styles.sectionLabel}>Director:</Text> {movie.Director}
              </Text>
              <Text>
                <Text strong className={styles.sectionLabel}>Writer:</Text> {movie.Writer}
              </Text>
              <Text>
                <Text strong className={styles.sectionLabel}>Actors:</Text> {movie.Actors}
              </Text>
            </Space>

            <Divider className={styles.divider} />

            <Title
              level={3}
              className={`${roboto.className} ${styles.plotTitle}`}
            >
              Plot
            </Title>

            <Text className={styles.plotText}>
              {movie.Plot && movie.Plot !== "N/A"
                ? movie.Plot
                : "No plot information available."}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
