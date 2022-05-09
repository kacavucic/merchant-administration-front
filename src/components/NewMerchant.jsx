import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NewMerchant({ user, token }) {
  const [merchant, setMerchant] = useState({
    id: null,
    display_name: "",
    address: "",
    phone_number: "",
    email: "",
    account_number: "",
  });

  function handleInput(event) {
    setMerchant({ ...merchant, [event.target.name]: event.target.value });
  }

  let navigate = useNavigate();
  function handleCreate(e) {
    e.preventDefault();
    var data = JSON.stringify({
      account_number: merchant.account_number,
      address: merchant.address,
      display_name: merchant.display_name,
      email: merchant.email,
      phone_number: merchant.phone_number,
    });

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/merchants",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="container-fluid mt-5 mb-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="card col-md-8 col-lg-6 col-xl-4 ">
          <div className="card-body">
            <form onSubmit={handleCreate}>
              <div className="row">
                <p className="lead fw-normal mb-0 ">Create New Merchant</p>
              </div>
              <div className="divider d-flex align-items-center my-4"></div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="display_name">
                  Name
                </label>
                <input
                  type="text"
                  id="display_name"
                  name="display_name"
                  className="form-control form-control-lg"
                  placeholder="Enter name"
                  value={merchant.display_name}
                  required
                  maxLength="255"
                  onChange={handleInput}
                />
                {/* {emailDuplicate.duplicate === false ? (
                        <></>
                      ) : (
                        <p className="alert alert-danger">
                          {emailDuplicate.message}
                        </p>
                      )} */}
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control form-control-lg"
                  placeholder="Enter address"
                  value={merchant.address}
                  maxLength="50"
                  onChange={handleInput}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="phone_number">
                  Phone number
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className="form-control form-control-lg"
                  placeholder="Enter phone number"
                  value={merchant.phone_number}
                  required
                  maxLength="50"
                  onChange={handleInput}
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
                  value={merchant.email}
                  required
                  maxLength="50"
                  onChange={handleInput}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="account_number">
                  Account number
                </label>
                <input
                  type="text"
                  id="account_number"
                  name="account_number"
                  className="form-control form-control-lg"
                  placeholder="Enter account number"
                  value={merchant.account_number}
                  required
                  maxLength="50"
                  onChange={handleInput}
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg float-end"
                  style={{
                    paddingLeft: 2.5 + "rem",
                    paddingRight: 2.5 + "rem",
                  }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewMerchant;
