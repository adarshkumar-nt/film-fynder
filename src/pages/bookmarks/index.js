import { bookmarkToggled } from "@/features/bookmarks/bookmarksSlice";
import { BookFilled } from "@ant-design/icons";
import { Card, Carousel, Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '360px',
  textAlign: 'center',
  background: '#364d79',
};

export default function Bookmark() {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);
  const onBookmarkClicked = (movie) => {
    dispatch(bookmarkToggled(movie));
  };
  return (
    <div>
      <Link href="/">Go to homepage</Link>
      <Carousel arrows autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Row gutter={32}>
        {bookmarks.map((movie) => (
          <Col span={6} style={{ padding: "8px" }} key={movie.imdbID}>
            <Card
              hoverable
              cover={
                <img draggable={false} alt={movie.title} src={movie.Poster} />
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
    </div>
  );
}
