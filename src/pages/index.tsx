"use client";

import NavBar from "@/components/navbar";
import Header from "@/components/header";
import RootLayout from "@/components/layout";
import Link from "next/link";

const Home = () => {
  // Whether running on a mobile device
  // const [isMobile, setIsMobile] = useState(false);
  // useEffect(() => {
  //   setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  // });

  return (
    <RootLayout>
      <NavBar activePage="home" />
      <Header />
      <br />
      <div className="container root-content">
        <div className="row">
          <div className="col">
            <p>Welcome to Wardi, your virtual wardrobe! Let&apos;s see how you look in different outfits.</p>

            Features offered:
            <ul>
              <li><Link href="/text-try">Text-based try-on</Link> <i className="bi bi-search-heart-fill m-1"></i></li>
              <li><Link href="/image-try">Image-based try-on</Link> <i className="bi bi-search-heart-fill m-1"></i></li>
              <li>Import from shop link <i className="bi bi-bag-heart-fill m-1"></i></li>
              <li>No signups/logins needed</li>
              <li>Mobile-friendly interface</li>
            </ul>

            <p>Here&apos;s a quick guide on how to use Wardi:</p>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
