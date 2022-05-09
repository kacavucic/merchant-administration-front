import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OneMerchant({ user, token }) {
  let { id } = useParams();

  const [merchant, setMerchant] = useState({
    id: null,
    display_name: "",
    address: "",
    phone_number: "",
    email: "",
    account_number: "",
  });

  useEffect(() => {
    axios.get("api/merchants/" + id).then((res) => {
      // console.log(res.data);
      setMerchant(res.data.merchant);
    });
  }, []);

  const [disabled, setDisabled] = useState(true);

  function handleEditButton() {
    if (disabled) {
      setDisabled(false);
    } else {
      axios.get("api/merchants/" + id).then((res) => {
        // console.log(res.data);
        setMerchant(res.data.merchant);
      });
      setDisabled(true);
    }
  }

  function handleInput(event) {
    setMerchant({ ...merchant, [event.target.name]: event.target.value });
  }

  function handleUpdate(e) {
    e.preventDefault();
    var data = JSON.stringify({
      account_number: merchant.account_number,
      address: merchant.address,
      display_name: merchant.display_name,
      email: merchant.email,
      phone_number: merchant.phone_number,
    });

    var config = {
      method: "put",
      url: "http://127.0.0.1:8000/api/merchants/" + merchant.id,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // navigate("/");
        handleEditButton();
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
            <form onSubmit={handleUpdate}>
              <div className="row">
                <p className="lead fw-normal mb-0 ">
                  Merchant: {merchant.display_name}
                  <a className="link-secondary float-end " href="#">
                    See all stores
                  </a>
                </p>
              </div>
              <div className="divider d-flex align-items-center my-4"></div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="id">
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  className="form-control form-control-lg"
                  defaultValue={merchant.id}
                  readOnly
                />
              </div>

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
                  readOnly={disabled}
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
                  readOnly={disabled}
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
                  readOnly={disabled}
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
                  readOnly={disabled}
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
                  readOnly={disabled}
                  onChange={handleInput}
                />
              </div>

              {disabled === true ? (
                <div className="text-center text-lg-start mt-4 pt-2">
                  <a
                    role="button"
                    //href="#"
                    className="btn btn-primary btn-lg float-end"
                    style={{
                      paddingLeft: 2.5 + "rem",
                      paddingRight: 2.5 + "rem",
                    }}
                    onClick={handleEditButton}
                  >
                    Edit
                  </a>
                </div>
              ) : (
                <div className="text-center text-lg-start mt-4 pt-2">
                  <a
                    role="button"
                    // href="#"
                    className="btn btn-secondary btn-lg float-start"
                    style={{
                      paddingLeft: 2.5 + "rem",
                      paddingRight: 2.5 + "rem",
                    }}
                    onClick={handleEditButton}
                  >
                    Cancel
                  </a>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg float-end"
                    style={{
                      paddingLeft: 2.5 + "rem",
                      paddingRight: 2.5 + "rem",
                    }}
                  >
                    Update
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneMerchant;
