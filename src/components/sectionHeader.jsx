"use client";
import { roboto } from "@/utils/fonts.mjs";
import { Card, Flex, Typography } from "antd";
const { Title } = Typography;


export default function SectionHeader({ title, image}) {
  return (
    <Card
      style={{
        borderRadius: "0",
        overflow: "hidden",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBottom: "32px",
      }}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          height: "20vh"
        }}
      >
        <Title
          className={roboto.className}
          style={{
            color: "#EFF1ED",
            margin: 0,
            textShadow: "0 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </Title>
      </Flex>
    </Card>
  );
}
