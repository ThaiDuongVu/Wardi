import { Html, Head, Main, NextScript } from "next/document";
import Footer from "@/components/footer";

const Document = () => {
  return (
    <Html lang="en" id="html" className="h-100">
      <Head />
      <body className="d-flex flex-column h-100">
        {/* Main */}
        <Main />
        <NextScript />

        {/* Footer */}
        <br />
        <Footer />
      </body>
    </Html>
  );
};

export default Document;
