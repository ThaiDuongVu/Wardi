import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-body-tertiary">
      <p className="fs-1 fw-bold text-center">
        <Image src="/icon.png" width={100} height={100} unoptimized= {true} alt="icon" className="img-fluid rounded header-icon" />ardi
      </p>
      <p className="fs-5 text-center">AI-powered clothing try-on tool</p>
      <hr />
    </div>
  );
};

export default Header;