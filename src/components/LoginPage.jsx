import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ addToken }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
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
        addToken(res.data.access_token);
        navigate("/");
      })
      .catch((e) => {
        setLoginError(true);
        console.log(e);
      });
  }
  return (
    <section>
      <div className="dark-overlay">
        <div className="home-inner">
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <div className="card-body">
                  <h4>Log In</h4>
                  <hr></hr>
                  {loginError === false ? (
                    <></>
                  ) : (
                    <p className="alert alert-danger">
                      Invalid email or password
                    </p>
                  )}

                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label className="lead" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        type="text"
                        onInput={handleInput}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label className="lead" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        type="password"
                        onInput={handleInput}
                      ></input>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Log In
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <p className="text-center">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
