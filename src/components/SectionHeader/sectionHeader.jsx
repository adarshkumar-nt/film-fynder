"use client";
import { roboto } from "@/utils/fonts.mjs";
import { Card, Flex, Typography } from "antd";
import styles from "./sectionHeader.module.css";

const { Title } = Typography;

export default function SectionHeader({ title, image }) {
  return (
    <Card
      className={styles.card}
      style={{ backgroundImage: `url(${image})` }}
    >
      <Flex align="center" justify="center" className={styles.flex}>
        <Title className={`${roboto.className} ${styles.title}`}>
          {title}
        </Title>
      </Flex>
    </Card>
  );
}
