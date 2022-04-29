import React from "react";
import {
  FiLogIn,
  FiUserPlus,
  FiHome,
  FiLogOut,
  FiServer,
  FiUser,
} from "react-icons/fi";

const NavBar = ({ token, user }) => {
  
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Merchant Administration
      </a>
      <button
        className="navbar-toggler"
        data-target="#navbarContent"
        data-toggle="collapse"
        type="button"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              <FiHome /> Home
            </a>
          </li>
          {token == null ? (
            <></>
          ) : (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                id="dropdownMenu"
                role="button"
              >
                <FiServer /> Administration
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Merchants
                </a>
                <a className="dropdown-item" href="#">
                  Stores
                </a>
                <a className="dropdown-item" href="#">
                  Agents
                </a>
              </div>
            </li>
          )}
        </ul>
        {token == null ? (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/login">
                <FiLogIn /> Log In
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">
                <FiUserPlus /> Register
              </a>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="navbar-text">
                <span>
                  <FiUser /> {user}
                </span>
              </span>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">
                <FiLogOut /> Logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
