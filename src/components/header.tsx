import "@/styles/global.css";

const Header = () => {
  return (
    <div className="bg-body-tertiary">
      <p className="fs-1 fw-bold text-center">
        <img src="/icon.png" alt="icon" className="img-fluid rounded header-icon" />ardi
      </p>
      <p className="fs-5 text-center">AI-powered clothing try-on tool</p>
      <hr />
    </div>
  );
};

export default Header;