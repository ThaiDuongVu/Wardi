"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import Head from "next/head";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // Bootstrap JavaScript
  useEffect(() => {
    /* eslint-disable */
    require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return (
    <div>
      {/* Head */}
      <Head>
        <title>Wardi</title>
        <meta name="description" content="AI-powered clothing try-on tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </div>
  );
};

export default RootLayout;