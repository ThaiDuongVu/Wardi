import type { AppProps } from "next/app";
import { useEffect } from "react";
import { getCookie, setCookie } from "@/cookieManager";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Set theme
    const theme = getCookie("theme");
    document?.getElementById("html")?.setAttribute("data-bs-theme", theme);
  }, []);

  return <Component {...pageProps} />;
};

export default App;
