import { Flex, Menu, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import SearchBar from "@/components/searchBar";
import { roboto, roboto_mono } from "@/utils/fonts.mjs";

const { Title } = Typography;



export default function Navbar() {
  const router = useRouter();

  const items = [
    { key: "bookmarks", label: "Bookmarks", path: "/bookmarks" },
    { key: "movies", label: "Movies", path: "/movies" },
    { key: "tv", label: "TV", path: "/tv" },
  ];

  const selectedKey = useMemo(() => {
    const currentPath = router.pathname.toLowerCase();
    if (currentPath.includes("bookmarks")) return "bookmarks";
    if (currentPath.includes("movies")) return "movies";
    if (currentPath.includes("tv")) return "tv";
    return "";
  }, [router.pathname]);

  const onClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      router.push(selectedItem.path);
    }
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        width: "100%",
        padding: "0 8px",
        height: "64px",
        gap: "16px",
      }}
    >
      <Title
        level={3}
        style={{ margin: 0, whiteSpace: "nowrap", letterSpacing: "1px" }}
        className={roboto.className}
      >
        <Link href="/" style={{ color: "#EFF1ED", textDecoration: "none" }}>
          FILM<span style={{ color: "#F06543" }}>FYNDER</span>
        </Link>
      </Title>

      <Menu
        onClick={onClick}
        items={items}
        mode="horizontal"
        theme="dark"
        selectedKeys={[selectedKey]}
        style={{
          background: "transparent",
          borderBottom: "none",
          flex: "1 1 auto",
          justifyContent: "center",
          display: "flex",
          minWidth: "300px",
        }}
        className={roboto_mono.className}
      />
      <SearchBar />
    </Flex>
  );
}
