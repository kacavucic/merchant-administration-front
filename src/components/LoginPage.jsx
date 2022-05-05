import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ addToken, addUser }) => {
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
        addUser(res.data.user);
        addToken(res.data.access_token);
        navigate("/");
      })
      .catch((e) => {
        setLoginError(true);
        console.log(e);
      });
  }
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className=" card col-md-8 col-lg-6 col-xl-4 ">
            <div className=" card-body ">
              <form onSubmit={handleLogin}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Log In</p>
                </div>
                <div className="divider d-flex align-items-center my-4"></div>
                {loginError === false ? (
                  <></>
                ) : (
                  <p className="alert alert-danger">
                    Invalid email or password
                  </p>
                )}

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
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
                    <a className="link-secondary" href="/register">
                      Register here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
