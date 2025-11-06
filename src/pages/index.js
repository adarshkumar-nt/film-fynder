"use client";
import { useSearchMovies } from "@/services/api/omdbApi";
import { Card, Row, Col, Pagination } from "antd";
import { Geist, Geist_Mono } from "next/font/google";
import { BookFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { bookmarkToggled } from "@/features/bookmarks/bookmarksSlice";
import Link from "next/link";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { Meta } = Card;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useSearchMovies({ s: "Joker", page: currentPage });
  const dispatch = useDispatch();
  const style = { background: "#0092ff", padding: "8px 0" };

  const onBookmarkClicked = (movie) => {
    dispatch(bookmarkToggled(movie));
  };

  const onPageChanged = page => {
    console.log(page);
    setCurrentPage(page)
  }

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} bg-zinc-50 font-sans dark:bg-black`}
    >
      <h1>Film Fynder</h1>
      <Link href="/bookmarks">Go to bookmarks</Link>
      <Row gutter={32}>
        {!isLoading &&
          data.Search?.map((movie) => (
            <Col span={6} style={{ padding: "8px" }} key={movie.imdbID}>
              <Card
                hoverable
                cover={
                  <img draggable={false} alt={movie.title} src={movie.Poster ? movie.Poster : "/default-movie.png"} />
                }
              >
                <Meta title={movie.Title} description={movie.Plot} />
                <BookFilled
                  style={{ color: "#efee45" }}
                  onClick={() => onBookmarkClicked(movie)}
                />
              </Card>
            </Col>
          ))}
      </Row>
      <Pagination current={currentPage} onChange={onPageChanged} total={50}/>
    </div>
  );
}
