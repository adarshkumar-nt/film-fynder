import React from "react";
import { Typography, Card, Row, Col } from "antd";
import styles from "./horizontalList.module.css";
import Link from "next/link";

const { Title } = Typography;

function HorizontalList({ title, movies }) {
  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        {title}
      </Title>

      <div className={styles.wrapper}>
        <div className={styles.fadeLeft}></div>
        <div className={styles.scrollContainer}>
          <Row wrap={false} gutter={32} className={styles.row}>
            {movies.map((movie) => (
              <Col key={movie.title} className={styles.col}>
                <Link href={movie.route}>
                  <Card
                    hoverable
                    className={styles.card}
                    cover={<img src={movie.image} className={styles.image} />}
                  >
                    <Card.Meta title={movie.title} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
        <div className={styles.fadeRight}></div>
      </div>
    </div>
  );
}

export default HorizontalList;
