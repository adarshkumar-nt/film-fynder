"use client";
import { useSearchMovies } from "@/services/api/omdbApi";
import MovieList from "@/components/movieList";
import Spinner from "@/components/spinner";
import { Flex, Typography, Space } from "antd";
import { Roboto } from "next/font/google";

const { Title, Text } = Typography;

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

export default function Home() {
  const { data, isLoading } = useSearchMovies();

  if (isLoading) return <Spinner />;

  if (data.Response === "False") {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "60vh" }}>
        <Title level={4} type="danger">
          Failed to load movies: {data.Error}
        </Title>
      </Flex>
    );
  }

  return (
    <Flex vertical align="center" style={{ width: "100%", paddingTop: "48px" }}>
      {/* Header / Intro Text */}
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        <Space direction="vertical" size={8} align="center" style={{width: "50%"}}>
          <Title
            className={roboto.className}
            style={{ marginBottom: 0 }}
          >
            Welcome to Film<span style={{color: "#F06543"}}>Fynder</span>
          </Title>
          <Text
            style={{ fontSize: "16px", lineHeight: "1.6" }}
          >
            Explore popular movies and TV shows from around the world. Search,
            discover, and bookmark your favorites effortlessly.
          </Text>
        </Space>
      </Flex>

      <MovieList movies={data.Search} totalResults={data.totalResults} />
    </Flex>
  );
}
