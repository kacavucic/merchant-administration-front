import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = ({ token, user, addToken, addUser }) => {
  let navigate = useNavigate();
  function handleLogout(e) {
    // e.preventDefault();
    var config = {
      method: "post",
      url: "api/logout",
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response);
        console.log(JSON.stringify(response.data));

        window.sessionStorage.setItem("auth_token", null);
        window.sessionStorage.setItem("auth_user", null);
        addToken(null);
        addUser(null);
        //navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Merchant Administration
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav d-flex flex-row me-auto me-3">
              <li className="nav-item me-3 me-lg-0 dropdown">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              {token == null ? (
                <></>
              ) : (
                <li className="nav-item me-3 me-lg-0 dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown1"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Administration
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown1"
                  >
                    <li>
                      <Link className="dropdown-item" to="/merchants">
                        Merchants
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/stores">
                        Stores
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/agents">
                        Agents
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
            {token == null ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    {user}
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
