import "../styles/global.css";
import Link from "next/link";

const NavBar = ({ activePage }: { activePage: string }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          {/* Brand */}
          <a className="navbar-brand" href="/" aria-label="brand">
          <img src="/icon.png" alt="icon" className="img-fluid rounded navbar-icon" />
          </a>

          {/* Button for mobile interface */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBarContent" aria-controls="navBarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav content */}
          <div className="collapse navbar-collapse" id="navBarContent">
            {/* Start content */}
            <div className="navbar-nav me-auto">
              <Link className={`nav-link ${activePage == "home" ? "active" : ""}`} href="/">
                Home <i className="bi bi-house-fill m-1"></i>
              </Link>
              <Link className={`nav-link ${activePage == "text-try" ? "active" : ""}`} href="/text-try">
                Text-Try <i className="bi bi-search-heart-fill m-1"></i>
              </Link>
              <Link className={`nav-link ${activePage == "image-try" ? "active" : ""}`} href="/image-try">
                Image-Try <i className="bi bi-search-heart-fill m-1"></i>
              </Link>
              <Link className={`nav-link ${activePage == "market" ? "active" : ""}`} href="/market">
                Market <i className="bi bi-bag-heart-fill m-1"></i>
              </Link>
            </div>
            {/* End content */}
            <div className="navbar-nav me-end">
              <button className="nav-link" type="button" aria-label="Settings">
                <i className="bi bi-gear-fill"></i>
              </button>
              <button className="nav-link" type="button" aria-label="Profile">
                <i className="bi bi-person-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
};

export default NavBar;