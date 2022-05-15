import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

function NavBar({ auth, addAuth }) {
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

        window.sessionStorage.removeItem("auth_token");
        window.sessionStorage.removeItem("auth_user");
        window.sessionStorage.removeItem("auth_role");
        addAuth({
          token: null,
          username: null,
          role: null,
        });
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
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {auth.token == null ? (
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
            {auth.token == null ? (
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
                  <a className="nav-link disabled" href="#">
                    {auth.role === "admin" ? (
                      <AdminPanelSettingsIcon icon={faUser} />
                    ) : (
                      <AccountCircleIcon icon={faUser} />
                    )}
                    {auth.username}
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
    </>
  );
}

export default NavBar;
