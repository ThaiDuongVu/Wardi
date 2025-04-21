import NavBar from "@/components/navbar";
import RootLayout from "./layout";

const Custom404 = () => {
  return (
    <RootLayout>
      <NavBar activePage="" />
      <div className="bg-body-tertiary">
        <p className="fs-1 fw-bold text-center">
          Page Not Found
        </p>
        <p className="fs-5 text-center"><a href="/">Return</a> to home</p>
        <hr />
      </div>
    </RootLayout>
  );
};

export default Custom404;