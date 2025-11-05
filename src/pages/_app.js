import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

import { store } from "@/store/store";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <Navbar/>
          <Component {...pageProps} />
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
}
