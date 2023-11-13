import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.showAlert("Logged out Successfully", "success ");
    // navigate("/login");
  };

  return (
    <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link`}
                onClick={props.handleMode}
                role="button"
              >
                {props.text}
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link
                className="btn btn-outline-primary mx-2"
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-primary mx-2"
                to="/signup"
                role="button"
              >
                Signup
              </Link>
            </form>
          ) : (
            <form className="d-flex">
              <Link
                className="btn btn-primary mx-2"
                role="button"
                onClick={props.handleUserDetails}
                to="/userdetails"
              >
                User Details
              </Link>
              <Link
                className="btn btn-primary mx-2"
                role="button"
                onClick={handleLogout}
                to="logout"
              >
                Logout
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
