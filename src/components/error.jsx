"use client";
import { roboto } from "@/utils/fonts.mjs";
import { Flex, Typography, Empty, Space, Result } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const { Title, Text } = Typography;

export default function ErrorComp({ message = "Something went wrong", error }) {
  return (
    <Result
      status="error"
      title={message}
      subTitle={error}
      extra={
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
      }
    />
  );
}
