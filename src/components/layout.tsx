"use client";

import "@/styles/bootstrap-zephyr.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // Bootstrap JavaScript
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;