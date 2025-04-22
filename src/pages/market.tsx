import RootLayout from "@/components/layout";
import NavBar from "@/components/navbar";
import "@/styles/global.css";

const Market = () => {
  return (
    <RootLayout>
      <NavBar activePage="market" />
      <br />
      <div className="container root-content">
        <div className="row">
          <h4 className="text-center">Market</h4>
        </div>
      </div>
    </RootLayout>
  )
};

export default Market;