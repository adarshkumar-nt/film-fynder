import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, FloatButton } from "antd";

import { store } from "@/store/store";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/searchBar";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <Navbar/>
          <SearchBar/>
          <Component {...pageProps} />
          <FloatButton.BackTop />
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
}
