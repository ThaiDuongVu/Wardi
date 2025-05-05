import { Html, Head, Main, NextScript } from "next/document";
import Footer from "@/components/footer";

const Document = () => {
  return (
    <Html lang="en" id="html" className="h-100">
      <Head />
      <body className="d-flex flex-column h-100">
        {/* Head */}
        <Head>
          <title>Wardi</title>
          <meta name="description" content="AI-powered clothing try-on tool" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

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
