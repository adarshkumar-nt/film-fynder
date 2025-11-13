"use client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, Flex, FloatButton, Layout, Typography } from "antd";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { store } from "@/store/store";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import { useState } from "react";
import { theme } from "@/utils/theme.mjs";

const { Text } = Typography;

const { Header, Footer, Content } = Layout;

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme}>
          <Layout style={{ minHeight: "100vh", maxWidth: "100vw" }}>
            <Header
              style={{
                position: "sticky",
                top: 0,
                zIndex: 5,
                width: "100%",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#28282d",
                borderBottom: "2px solid transparent",
                borderImage: "linear-gradient(to right, #F06543, #1C7C54)",
                borderImageSlice: 1,
              }}
            >
              <Navbar />
            </Header>
            <Content
              style={{
                backgroundColor: "#2B2B31",
                paddingBottom: "24px",
              }}
            >
              <Component {...pageProps} />
            </Content>
            <Footer style={{ backgroundColor: "#28282d" }}>
              <Flex vertical justify="center" align="center">
                <Text>
                  &copy; {new Date().getFullYear()} FilmFyndr | Built with
                  Next.js and Ant Design.
                </Text>
                <Text>Data provided by Open Movie Database (OMDB) API.</Text>
              </Flex>
            </Footer>
            <FloatButton.BackTop type="primary" tooltip={{title: "Back to Top"}}/>
          </Layout>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
