import type { AppProps } from "next/app";
import { useEffect } from "react";
import { getCookie } from "@/cookieManager";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const theme = getCookie("theme");
    document?.getElementById("html")?.setAttribute("data-bs-theme", theme);
  }, []);

  return <Component {...pageProps} />;
};

export default App;
