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
      <Flex justify="center" style={{ width: "100%", padding: "40px 0" }}>
        <Skeleton active avatar paragraph={{ rows: 10 }} style={{ width: "80%" }} />
      </Flex>
    );
  }
  return (
    <>
      {contextHolder}

      <Flex justify="center" style={{ width: "100%" }}>
        <Flex
          wrap
          gap="large"
          style={{
            width: "100%",
            maxWidth: "1100px",
            margin: "40px auto",
            paddingInline: "24px",
          }}
        >
          <Flex
            justify="center"
            align="center"
            style={{
              flex: "0 0 280px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
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
              style={{ objectFit: "cover", borderRadius: "10px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-movie.png";
              }}
            />
          </Flex>

          <Flex vertical style={{ flex: "1 1 500px", minWidth: "260px" }}>
            <Flex justify="space-between" align="center" style={{ marginBottom: "8px" }}>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => router.back()}
                style={{
                  color: "#EFF1ED",
                  fontSize: "16px",
                }}
              >
                Back
              </Button>

              <Tooltip title={isBookmarked ? "Remove bookmark" : "Add to bookmarks"}>
                <BookFilled
                  onClick={onBookmarkClicked}
                  style={{
                    color: isBookmarked ? "#F2BB05" : "#ccc",
                    fontSize: "22px",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </Tooltip>
            </Flex>

            <Title
              level={2}
              className={roboto.className}
              style={{ color: "#FFF", marginBottom: "12px" }}
            >
              {movie.Title}
            </Title>

            <Space size="middle" wrap>
              {movie.Year && (
                <Tag
                  icon={<CalendarOutlined />}
                  style={{
                    background: "#3B3B45",
                    border: "none",
                    color: "#FFF",
                  }}
                >
                  {movie.Year}
                </Tag>
              )}

              {movie.Runtime && (
                <Tag
                  icon={<ClockCircleOutlined />}
                  style={{
                    background: "#3B3B45",
                    border: "none",
                    color: "#FFF",
                  }}
                >
                  {movie.Runtime}
                </Tag>
              )}

              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <Tag
                  icon={<StarFilled />}
                  style={{
                    background: "#3B3B45",
                    border: "none",
                    color: "#F2BB05",
                  }}
                >
                  {movie.imdbRating}/10
                </Tag>
              )}
            </Space>

            <Divider style={{ backgroundColor: "#555" }} />

            <Space direction="vertical" size="small">
              <Text>
                <Text strong style={{ color: "#FFF" }}>Genre:</Text> {movie.Genre}
              </Text>

              <Text>
                <Text strong style={{ color: "#FFF" }}>Director:</Text> {movie.Director}
              </Text>

              <Text>
                <Text strong style={{ color: "#FFF" }}>Writer:</Text> {movie.Writer}
              </Text>

              <Text>
                <Text strong style={{ color: "#FFF" }}>Actors:</Text> {movie.Actors}
              </Text>
            </Space>

            <Divider style={{ backgroundColor: "#555" }} />

            <Title
              level={3}
              className={roboto.className}
              style={{ color: "#FFF", marginBottom: "8px" }}
            >
              Plot
            </Title>

            <Text style={{ color: "#D8D8D8", lineHeight: "1.7", fontSize: "15px" }}>
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
