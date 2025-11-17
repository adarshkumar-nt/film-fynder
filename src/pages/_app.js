"use client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, Layout, Typography, FloatButton, Flex } from "antd";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { store } from "@/store/store";
import "@/styles/globals.css";
import styles from "@/styles/App.module.css";
import Navbar from "@/components/Navbar/navbar";
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
          <Layout className={styles.layout}>
            <Header className={styles.header}>
              <Navbar />
            </Header>
            <Content className={styles.content}>
              <Component {...pageProps} />
            </Content>
            <Footer className={styles.footer}>
              <Flex vertical justify="center" align="center">
                <Text>
                  &copy; {new Date().getFullYear()} FilmFyndr | Built with Next.js and Ant Design.
                </Text>
                <Text>Data provided by Open Movie Database (OMDB) API.</Text>
              </Flex>
            </Footer>
            <FloatButton.BackTop type="primary" tooltip={{ title: "Back to Top" }} />
          </Layout>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
