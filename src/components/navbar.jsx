"use client";
import { useState, useMemo } from "react";
import { Flex, Menu, Typography, Button, Drawer, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "@/components/searchBar";
import { roboto, nunito } from "@/utils/fonts.mjs";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function Navbar() {
  const router = useRouter();
  const screens = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const onMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      router.push(selectedItem.path);
      setDrawerOpen(false);
    }
  };

  const isMobile = !screens.md;

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: "100%",
          padding: isMobile ? "0 12px" : "0 16px",
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
            FILM<span style={{ color: "#F06543" }}>FYNDR</span>
          </Link>
        </Title>

        {!isMobile && (
          <Menu
            onClick={onMenuClick}
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
            }}
            className={nunito.className}
          />
        )}

        {!isMobile && <SearchBar />}

        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24, color: "#EFF1ED" }} />}
            onClick={() => setDrawerOpen(true)}
          />
        )}
      </Flex>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
        bodyStyle={{ padding: 0 }}
        headerStyle={{ background: "#28282d", borderBottom: "none" }}
        style={{ background: "#2B2B31" }}
      >
        <Flex vertical style={{ padding: "16px" }} gap="large">
          <SearchBar />

          <Menu
            onClick={onMenuClick}
            items={items}
            mode="vertical"
            theme="dark"
            selectedKeys={[selectedKey]}
            style={{
              background: "transparent",
              borderRight: "none",
              marginTop: "16px",
            }}
          />
        </Flex>
      </Drawer>
    </>
  );
}
