"use client";
import { roboto } from "@/utils/fonts.mjs";
import { Flex, Typography, Empty, Space } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const { Title, Text } = Typography;

export default function ErrorComp({ message = "Something went wrong", error }) {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        minHeight: "60vh",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Empty
        image={<WarningOutlined style={{ fontSize: 48, color: "#F06543"}} />}
        styles={{image: {marginBottom: "10px", height: "auto", minHeight: "0px"}}}
        description={
          <Space direction="vertical" align="center" size={0}>
            <Title
              level={3}
              className={roboto.className}
              style={{ margin: 0, color: "#EFF1ED" }}
            >
              {message}
            </Title>

            {error && (
              <Text style={{ margin: 0, color: "#B0B0B0" }}>
                {error}
              </Text>
            )}

            <Link
              href="/"
              style={{
                marginTop: 8,
                color: "#F2BB05",
                fontWeight: 500,
                textDecoration: "underline",
              }}
            >
              Go back to homepage
            </Link>
          </Space>
        }
      />
    </Flex>
  );
}
