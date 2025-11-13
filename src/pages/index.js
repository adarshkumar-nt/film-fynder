"use client";
import { useSearchMovies } from "@/services/api/omdbApi";
import MovieList from "@/components/movieList";
import Spinner from "@/components/spinner";
import { Flex, Typography, Space, Carousel, Grid } from "antd";
import { roboto } from "@/utils/fonts.mjs";
import ErrorComp from "@/components/error";
import Link from "next/link";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const featuredData = [
  { title: "Batman", image: "/batman.jpg", route: "/movies/tt1877830" },
  { title: "Parasite", image: "/parasite.jpg", route: "/movies/tt6751668" },
  { title: "Dark", image: "/dark.jpg", route: "/tv/tt5753856" },
  {
    title: "Stranger Things",
    image: "/stranger-things.jpg",
    route: "/tv/tt4574334",
  },
  { title: "Se7en", image: "/se7en.jpg", route: "/movies/tt0114369" },
  { title: "1917", image: "/1917.jpg", route: "/movies/tt8579674" },
  { title: "The Boys", image: "/boys.jpg", route: "/tv/tt1190634" },
  { title: "Breaking Bad", image: "/breaking-bad.jpg", route: "/tv/tt0903747" },
  { title: "Fight Club", image: "/fight-club.jpg", route: "/movies/tt0137523" },
  {
    title: "Oppenheimer",
    image: "/oppenheimer.jpg",
    route: "/movies/tt15398776",
  },
];

export default function Home() {
  const { data, isLoading } = useSearchMovies();
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const carouselHeight = isMobile ? "45vh" : "75vh";

  if (isLoading) return <Spinner />;
  if (data.Response === "False")
    return (
      <ErrorComp message="Failed to load movie or series" error={data.Error} />
    );

  return (
    <Flex vertical align="center" style={{ width: "100%" }}>
      <Carousel
        autoplay
        autoplaySpeed={3500}
        dots
        arrows
        effect="fade"
        style={{
          width: "99vw",
          height: carouselHeight,
          overflow: "hidden",
          marginBottom: "48px",
        }}
      >
        {featuredData.map((item, index) => (
          <Link key={index} href={item.route} style={{ display: "block" }}>
            <div
              style={{
                width: "100%",
                height: carouselHeight,
                position: "relative",
                cursor: "pointer",
              }}
            >
              <img
                src={item.image}
                alt={item.title || "Featured"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                }}
              />
            </div>
          </Link>
        ))}
      </Carousel>

      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          marginBottom: "48px",
          textAlign: "center",
          paddingInline: "16px",
          width: "100%",
        }}
      >
        <Space
          direction="vertical"
          size={8}
          align="center"
          style={{ width: "min(90%, 600px)" }}
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
