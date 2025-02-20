import "@/styles/globals.css";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";

async function initMocks() {
  if (typeof window === "undefined") {
  } else {
    const { worker } = await import("@/mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}

initMocks();

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Component {...pageProps} />
    </MantineProvider>
  );
}
