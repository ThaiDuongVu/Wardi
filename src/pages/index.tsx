"use client";

import NavBar from "@/components/navbar";
import Header from "@/components/header";
import RootLayout from "@/components/layout";

const Home = () => {
  return (
    <RootLayout>
      <NavBar activePage="home" />
      <Header />
      <br />
      <div className="container root-content">
        <div className="row">
          <div className="col">
            <p>Welcome to Wardi, your virtual wardrobe! Let's see how you look in different outfits.</p>

            Features offered:
            <ul>
              <li><a href="/text-try">Text-based try-on</a> <i className="bi bi-search-heart-fill m-1"></i></li>
              <li><a href="/image-try">Image-based try-on</a> <i className="bi bi-search-heart-fill m-1"></i></li>
              <li>Import from shop link <i className="bi bi-bag-heart-fill m-1"></i></li>
              <li>No signups/logins needed</li>
            </ul>

            <p>Here's a quick guide on how to use Wardi:</p>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
