import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
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
    <div className="container-fluid mt-5 mb-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="card col-md-8 col-lg-6 col-xl-4">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Register</p>
              </div>
              <div className="divider d-flex align-items-center my-4"></div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Enter name"
                  required
                  minLength="3"
                  maxLength="255"
                  onInput={handleInput}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Enter email"
                  required
                  maxLength="255"
                  onInput={handleInput}
                />

                {emailDuplicate.duplicate === false ? (
                  <></>
                ) : (
                  <>
                    <hr></hr>
                    <p className="alert alert-danger">
                      {emailDuplicate.message}
                    </p>
                  </>
                )}
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
                  // pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&+=])(?=\S+$).{8,20}$"
                  // title="Must contain at least one digit, one uppercase, one lowercase, one special character, and at least 8 and at most 20 characters "
                  required
                  minLength="8"
                  onInput={handleInput}
                />
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{
                    paddingLeft: 2.5 + "rem",
                    paddingRight: 2.5 + "rem",
                  }}
                >
                  Register
                </button>
                <p className="small fw mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <Link className="link-secondary" to="/login">
                    Click here to login
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

export default RegisterPage;
