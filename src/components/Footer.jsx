import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <footer className="footer bg-light" id="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
            <ul className="list-inline mb-2">
              <li className="list-inline-item">
                <a href="#!">About</a>
              </li>
              <li className="list-inline-item">⋅</li>
              <li className="list-inline-item">
                <a href="#!">Contact</a>
              </li>
              <li className="list-inline-item">⋅</li>
              <li className="list-inline-item">
                <a href="#!">Terms of Use</a>
              </li>
              <li className="list-inline-item">⋅</li>
              <li className="list-inline-item">
                <a href="#!">Privacy Policy</a>
              </li>
            </ul>
            <p className="text-muted small mb-4 mb-lg-0">
              &copy; Merchant Administration 2022. All Rights Reserved.
            </p>
          </div>
          <div className="col-lg-6 h-100 text-center text-lg-end my-auto">
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-4">
                <a href="#!">
                  <FacebookIcon></FacebookIcon>
                </a>
              </li>
              <li className="list-inline-item me-4">
                <a href="#!">
                  <TwitterIcon></TwitterIcon>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#!">
                  <InstagramIcon></InstagramIcon>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
