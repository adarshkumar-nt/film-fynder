"use client";
import { useState, useMemo } from "react";
import { Flex, Menu, Typography, Button, Drawer, Grid } from "antd";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { roboto, nunito } from "@/utils/fonts.mjs";

import styles from "./navbar.module.css";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function Navbar() {
  const router = useRouter();
  const screens = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const items = [
    { key: "home", label: "Home", path: "/" },
    { key: "bookmarks", label: "Bookmarks", path: "/bookmarks" },
    { key: "movies", label: "Movies", path: "/movies" },
    { key: "tv", label: "TV", path: "/tv" },
  ];

const selectedKey = router.pathname.includes("bookmarks")
  ? "bookmarks"
  : router.pathname.includes("movies")
  ? "movies"
  : router.pathname.includes("tv")
  ? "tv"
  : router.pathname.includes("search")
  ? ""
  : "home";

  const isMobile = !screens.md;

  const handleSearch = () => router.push("/search");

  const onMenuClick = (e) => {
    const route = items.find((item) => item.key === e.key)?.path;
    if (route) {
      router.push(route);
      setDrawerOpen(false);
    }
  };

  return (
    <>
      <Flex className={styles.navbar}>
        <Title level={3} className={`${styles.logoText} ${roboto.className}`}>
          <Link href="/" className={styles.logoLink}>
            FILM<span className={styles.logoHighlight}>FYNDR</span>
          </Link>
        </Title>

        {!isMobile && (
          <Menu
            onClick={onMenuClick}
            items={items}
            mode="horizontal"
            theme="dark"
            selectedKeys={[selectedKey]}
            className={`${styles.menuWrapper} ${nunito.className}`}
          />
        )}

        {!isMobile && (
          <Button
            type="text"
            icon={<SearchOutlined className={styles.iconButton} />}
            onClick={handleSearch}
          />
        )}

        {isMobile && (
          <Flex className={styles.mobileActionWrapper}>
            <Button
              type="text"
              icon={<SearchOutlined className={styles.iconButton} />}
              onClick={handleSearch}
            />
            <Button
              type="text"
              icon={<MenuOutlined className={styles.mobileMenuButton} />}
              onClick={() => setDrawerOpen(true)}
            />
          </Flex>
        )}
      </Flex>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
        className={styles.drawer}
      >
        <Menu
          onClick={onMenuClick}
          items={items}
          mode="vertical"
          theme="dark"
          selectedKeys={[selectedKey]}
          className={styles.drawerMenu}
        />
      </Drawer>
    </>
  );
}
