"use client";
import { useSearchMovies } from "@/services/api/omdbApi";
import MovieList from "@/components/movieList";
import Spinner from "@/components/spinner";
import { Flex, Typography, Space } from "antd";
import { roboto } from "@/utils/fonts.mjs";
import Error from "@/components/error";
import ErrorComp from "@/components/error";

const { Title, Text } = Typography;

export default function Home() {
  const { data, isLoading } = useSearchMovies();

  if (isLoading) return <Spinner />;

  if (data.Response === "False") {
    return (
      <ErrorComp message="Failed to load movie or series" error={data.Error}/>
    );
  }
  return (
    <Flex vertical align="center" style={{ width: "100%", paddingTop: "48px" }}>
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        <Space
          direction="vertical"
          size={8}
          align="center"
          style={{ width: "60%" }}
        >
          <Title className={roboto.className} style={{ marginBottom: 0 }}>
            Welcome to Film<span style={{ color: "#F06543" }}>Fyndr</span>
          </Title>
          <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
            Explore popular movies and TV shows from around the world. Search,
            discover, and bookmark your favorites effortlessly.
          </Text>
        </Space>
      </Flex>
      <MovieList movies={data.Search} totalResults={data.totalResults} />
    </Flex>
  );
}
