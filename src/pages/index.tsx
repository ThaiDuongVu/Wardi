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
      <div className="container root-content">
        <div className="row">
          <div className="col">
            Welcome to Wardi, your virtual wardrobe!
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <div className="accordion" id="accordionExample">
              {/* Log in */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#logInCollapse" aria-expanded="true" aria-controls="logInCollapse">
                    Log In
                  </button>
                </h2>
                <div id="logInCollapse" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {/* Form */}
                    <form action="submit">
                      <div className="form-floating m-2">
                        <input type="email" className="form-control" id="loginEmailInput" placeholder="name@example.com" required />
                        <label htmlFor="loginEmailInput">Email address</label>
                      </div>
                      <div className="form-floating m-2">
                        <input type="password" className="form-control" id="loginPasswordInput" placeholder="Password" required />
                        <label htmlFor="loginPasswordInput">Password</label>
                      </div>
                      <div className="m-2">
                        <button type="submit" className="btn btn-primary">Log in<i className="bi bi-arrow-right-circle-fill m-1"></i></button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Register */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#registerCollapse" aria-expanded="false" aria-controls="registerCollapse">
                    Register
                  </button>
                </h2>
                <div id="registerCollapse" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {/* Form */}
                    <form action="submit">
                      <div className="form-floating m-2">
                        <input type="email" className="form-control" id="registerEmailInput" placeholder="name@example.com" required />
                        <label htmlFor="registerEmailInput">Email address</label>
                      </div>
                      <div className="form-floating m-2">
                        <input type="password" className="form-control" id="registerPasswordInput" placeholder="Password" required />
                        <label htmlFor="registerPasswordInput">Password</label>
                      </div>
                      <div className="form-floating m-2">
                        <input type="password" className="form-control" id="confirmPasswordInput" placeholder="Password" required />
                        <label htmlFor="confirmPasswordInput">Confirm password</label>
                      </div>
                      <div className="m-2">
                        <button type="submit" className="btn btn-primary">Register<i className="bi bi-arrow-right-circle-fill m-1"></i></button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
