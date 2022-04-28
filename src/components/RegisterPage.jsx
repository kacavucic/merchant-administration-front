import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    // console.log(newUserData);
    setUserData(newUserData);
  }

  let navigate = useNavigate();
  const [emailDuplicate, setEmailDuplicate] = useState({
    duplicate: false,
    message: "",
  });
  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("api/register", userData)
      .then((res) => {
        // setEmailDuplicate({
        //   duplicate: false,
        //   message: "",
        // });
        console.log(res.data);
        navigate("/login");
      })
      .catch((e) => {
        setEmailDuplicate({
          duplicate: true,
          message: e.response.data.message.email,
        });
        console.log(e);
        // console.log(e.response.data.message);
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
                  <h4>Registration form</h4>
                  <hr></hr>
                  <form id="registration" onSubmit={handleRegister}>
                    <div className="form-group">
                      <label className="lead" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        required
                        type="text"
                        minLength="3"
                        maxLength="255"
                        onInput={handleInput}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label className="lead" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        required
                        type="email"
                        maxLength="255"
                        onInput={handleInput}
                      ></input>

                      {emailDuplicate.duplicate === false ? (
                        <></>
                      ) : (
                        <p className="alert alert-danger">
                          {emailDuplicate.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="lead" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="form-control"
                        id="password"
                        name="password"
                        // pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&+=])(?=\S+$).{8,20}$"
                        // title="Must contain at least one digit, one uppercase, one lowercase, one special character, and at least 8 and at most 20 characters "
                        placeholder="Enter password"
                        required
                        type="password"
                        minLength="8"
                        onInput={handleInput}
                      ></input>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary" type="submit">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <p className="text-center">
              Already have an account? <a href="/login">Click here to login</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
