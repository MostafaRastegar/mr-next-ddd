import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRouter from "@/components/AppRouter";
import { customTheme } from "papak/configs/antdCustomTheme";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={customTheme}>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <AppRouter />
          </div>
        </BrowserRouter>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
