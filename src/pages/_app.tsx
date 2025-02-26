import "@/styles/globals.css";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

async function initMocks() {
  if (typeof window === "undefined") {
    const { server } = await import("@/mocks/server");
    server.listen({ onUnhandledRequest: "bypass" });
    console.log("MSW started on server");
  } else {
    const { worker } = await import("@/mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}

initMocks();

const queryClient = new QueryClient();

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
