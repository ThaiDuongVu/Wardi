"use client";

import NavBar from "@/components/navbar";
import Header from "@/components/header";
import RootLayout from "./layout";

const Home = () => {
  return (
    <RootLayout>
      <NavBar activePage="home" />
      <Header />
      <br />
      <div className="container">
        <div className="row">
          <div className="col">
            Hello, World!
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
