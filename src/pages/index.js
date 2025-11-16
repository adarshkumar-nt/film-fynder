"use client";

import { Typography, Space, Carousel, Grid } from "antd";
import { roboto } from "@/utils/fonts.mjs";
import Link from "next/link";
import HorizontalList from "@/components/HorizontalList/horizontalList";
import { featuredSeries, featuredData, featuredMovies } from "@/utils/movieData.mjs";
import styles from "./Home.module.css";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function Home() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const carouselHeight = isMobile ? "45vh" : "75vh";

  return (
    <div className={styles.container}>
      <Carousel
        autoplay
        autoplaySpeed={2000}
        dots
        effect="fade"
        arrows
        className={styles.carousel}
        style={{ height: carouselHeight }}
      >
        {featuredData.map((item, index) => (
          <Link key={index} href={item.route} style={{ display: "block" }}>
            <div className={styles.carouselImageWrapper} style={{ height: carouselHeight }}>
              <img src={item.image} alt={item.title} className={styles.carouselImage} />
            </div>
          </Link>
        ))}
      </Carousel>

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <Title className={roboto.className} style={{ marginBottom: 0 }}>
            Welcome to Film<span style={{ color: "#F06543" }}>Fyndr</span>
          </Title>
          <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
            Explore popular movies and TV shows from around the world. Search,
            discover, and bookmark your favorites effortlessly.
          </Text>
        </div>
      </div>

      <HorizontalList title="Trending Movies" movies={featuredMovies} />
      <HorizontalList title="Trending Series" movies={featuredSeries} />
    </div>
  );
}
