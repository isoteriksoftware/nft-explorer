import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "'Poppins', Roboto, Helvetica, Arial, sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
