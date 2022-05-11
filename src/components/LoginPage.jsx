import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginPage({ addAuth }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    console.log(newUserData);
    setUserData(newUserData);
  }

  let navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("api/login", userData)
      .then((res) => {
        setLoginError(false);
        console.log(res.data);
        window.sessionStorage.setItem("auth_token", res.data.access_token);
        window.sessionStorage.setItem("auth_user", res.data.user);
        window.sessionStorage.setItem("auth_role", res.data.role);
        addAuth({
          token: res.data.access_token,
          username: res.data.user,
          role: res.data.role,
        });
        navigate("/");
      })
      .catch((e) => {
        setLoginError(true);
        console.log(e);
      });
  }
  return (
    <div className="container-fluid mt-5 mb-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className=" card col-md-8 col-lg-6 col-xl-4 ">
          <div className=" card-body ">
            <form onSubmit={handleLogin}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Login</p>
              </div>
              <div className="divider d-flex align-items-center my-4"></div>
              {loginError === false ? (
                <></>
              ) : (
                <p className="alert alert-danger">Invalid email or password</p>
              )}

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Enter email"
                  onInput={handleInput}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  onInput={handleInput}
                />
              </div>

              {/* <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div> */}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{
                    paddingLeft: 2.5 + "rem",
                    paddingRight: 2.5 + "rem",
                  }}
                >
                  Login
                </button>
                <p className="small fw mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link className="link-secondary" to="/register">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
