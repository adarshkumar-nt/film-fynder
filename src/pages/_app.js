import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, FloatButton, Layout } from "antd";

import { store } from "@/store/store";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/searchBar";

const queryClient = new QueryClient();
const { Header, Footer, Content, Sider } = Layout;

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <Layout>
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
            <Content style={{ padding: "32px" }}>
              <Component {...pageProps} />
            </Content>
            <Footer>Footer</Footer>
            <FloatButton.BackTop />
          </Layout>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
}
