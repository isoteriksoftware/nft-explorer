import "@/styles/globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f9f9f9",
    },
  },
  typography: {
    fontFamily: "'Poppins', Roboto, Helvetica, Arial, sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
