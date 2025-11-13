"use client";
import {
  Flex,
  Typography,
  Image,
  Tag,
  Divider,
  Space,
  Card,
  message,
  Tooltip,
} from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  StarFilled,
  BookFilled,
} from "@ant-design/icons";
import { roboto } from "@/utils/fonts.mjs";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkToggled } from "@/features/bookmarks/bookmarksSlice";

const { Title, Text } = Typography;

export default function MovieDetail({ movie }) {
  const [messageApi, contextHolder] = message.useMessage();
  const bookmarks = useSelector((state) => state.bookmarks);
  const isBookmarked = bookmarks.some((b) => b.imdbID === movie.imdbID);
  const dispatch = useDispatch();
  const onBookmarkClicked = (movie) => {
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
    <Flex
      justify="center"
      align="flex-start"
      wrap
      gap="large"
      style={{
        maxWidth: "1100px",
        maxHeight: "100%",
        margin: "40px auto",
        padding: "0 24px",
      }}
    >
      {contextHolder}
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
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-movie.png";
          }}
          alt={movie.Title}
          preview={false}
          width={280}
          height={420}
          style={{
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </Flex>

      <Flex vertical flex="1 1 500px" style={{ minWidth: "200px" }}>
        <Flex justify="space-between">
          <Title
            className={roboto.className}
            style={{
              color: "#FFFFFF",
              marginBottom: "12px",
            }}
          >
            {movie.Title}
          </Title>
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

        <Space size="middle" wrap>
          {movie.Year && (
            <Tag
              icon={<CalendarOutlined />}
              style={{
                background: "#3B3B45",
                border: "none",
                color: "#FFF",
                fontWeight: "500",
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
                fontWeight: "500",
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
                fontWeight: "500",
              }}
            >
              {movie.imdbRating}/10
            </Tag>
          )}
        </Space>

        <Divider style={{ backgroundColor: "#555", margin: "20px 0" }} />

        <Space direction="vertical" size="small">
          <Text>
            <Text strong style={{ color: "#FFF" }}>
              Genre:
            </Text>{" "}
            {movie.Genre || "N/A"}
          </Text>

          <Text>
            <Text strong style={{ color: "#FFF" }}>
              Director:
            </Text>{" "}
            {movie.Director || "N/A"}
          </Text>

          <Text>
            <Text strong style={{ color: "#FFF" }}>
              Writer:
            </Text>{" "}
            {movie.Writer || "N/A"}
          </Text>

          <Text>
            <Text strong style={{ color: "#FFF" }}>
              Actors:
            </Text>{" "}
            {movie.Actors || "N/A"}
          </Text>
        </Space>

        <Divider style={{ backgroundColor: "#555", margin: "20px 0" }} />

        <Flex vertical>
          <Title
            level={2}
            className={roboto.className}
            style={{
              color: "#FFFFFF",
              marginBottom: "8px",
            }}
          >
            Plot
          </Title>
          <Text
            style={{
              lineHeight: "1.7",
              color: "#D8D8D8",
              fontSize: "15px",
            }}
          >
            {movie.Plot && movie.Plot !== "N/A"
              ? movie.Plot
              : "No plot information available."}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
