"use client";

import "@/styles/bootstrap-zephyr.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Head from "next/head";
import Footer from "@/components/footer";
import { useEffect } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // Bootstrap JavaScript
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
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

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <br />
      <Footer />
    </div>
  );
};

export default RootLayout;