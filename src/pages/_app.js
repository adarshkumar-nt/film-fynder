"use client"
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, FloatButton, Layout } from "antd";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { store } from "@/store/store";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import { useState } from "react";
// import SearchBar from "@/components/searchBar";

const { Header, Footer, Content, Sider } = Layout;

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <Layout style={{minHeight: "100vh"}}>
            <Header
              style={{
                position: "sticky",
                top: 0,
                zIndex: 5,
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Navbar />
            </Header>
            <Content style={{ padding: "32px"}}>
              <Component {...pageProps} />
            </Content>
            <Footer>Footer</Footer>
            <FloatButton.BackTop />
          </Layout>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
