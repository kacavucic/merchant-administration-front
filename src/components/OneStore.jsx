import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const OneStore = ({ auth, addStore }) => {
  let { id } = useParams();

  const [store, setStore] = useState({
    id: null,
    display_name: "",
    address: "",
    phone_number: "",
    email: "",
    merchant_id: "",
  });
  const [merchants, setMerchants] = useState();

  useEffect(() => {
    if (merchants == null) {
      var data = "";

      var config = {
        method: "get",
        url: "http://127.0.0.1:8000/api/merchants",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setMerchants(response.data.merchants);
          // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (id != undefined) {
      var data = "";

      var config = {
        method: "get",
        url: "http://127.0.0.1:8000/api/stores/" + id,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setStore({
            id: response.data.store.id,
            display_name: response.data.store.display_name,
            address: response.data.store.address,
            phone_number: response.data.store.phone_number,
            email: response.data.store.email,
            merchant_id: response.data.store.merchant.id,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  const [disabled, setDisabled] = useState(true);

  function handleEditButton() {
    if (disabled) {
      setDisabled(false);
    } else {
      var data = "";

      var config = {
        method: "get",
        url: "http://127.0.0.1:8000/api/stores/" + id,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setStore(response.data.store);
        })
        .catch(function (error) {
          console.log(error);
        });

      setDisabled(true);
    }
  }

  function handleInput(event) {
    setStore({ ...store, [event.target.name]: event.target.value });
  }

  function handleUpdate(e) {
    e.preventDefault();
    var data = JSON.stringify({
      display_name: store.display_name,
      address: store.address,
      phone_number: store.phone_number,
      email: store.email,
      merchant_id: store.merchant_id,
    });

    var config = {
      method: "put",
      url: "http://127.0.0.1:8000/api/stores/" + store.id,
      headers: {
        Authorization: "Bearer " + auth.token,
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
  let navigate = useNavigate();
  function handleCreate(e) {
    e.preventDefault();
    var data = JSON.stringify({
      display_name: store.display_name,
      address: store.address,
      phone_number: store.phone_number,
      email: store.email,
      merchant_id: store.merchant_id,
    });

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/stores",
      headers: {
        Authorization: "Bearer " + auth.token,
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
            <form onSubmit={id != undefined ? handleUpdate : handleCreate}>
              {id != undefined ? (
                <div className="row">
                  <p className="lead fw-normal mb-0 ">
                    Store: {store.display_name}
                    <br></br>
                    <Link
                      className="link-secondary"
                      to={"/stores/" + store.id + "/agents"}
                    >
                      See all agents
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="row">
                  <p className="lead fw-normal mb-0 ">Create New Store</p>
                </div>
              )}

              <div className="divider d-flex align-items-center my-4"></div>
              {id != undefined ? (
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="id">
                    ID
                  </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    className="form-control form-control-lg"
                    defaultValue={store.id}
                    readOnly
                  />
                </div>
              ) : (
                <></>
              )}

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
                  value={store.display_name}
                  required
                  maxLength="255"
                  readOnly={id != undefined ? disabled : false}
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
                  value={store.address}
                  maxLength="50"
                  readOnly={id != undefined ? disabled : false}
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
                  value={store.phone_number}
                  maxLength="50"
                  readOnly={id != undefined ? disabled : false}
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
                  value={store.email}
                  required
                  maxLength="50"
                  readOnly={id != undefined ? disabled : false}
                  onChange={handleInput}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="merchant_id">
                  Merchant
                </label>
                <select
                  className="form-select"
                  id="merchant_id"
                  name="merchant_id"
                  value={store.merchant_id}
                  required
                  disabled={id != undefined ? disabled : false}
                  onChange={handleInput}
                >
                  <option className="placeholder" key={null} value={null}>
                    -- select a merchant --
                  </option>
                  {merchants?.map((merchant) => (
                    <option key={merchant.id} value={merchant.id}>
                      {merchant.display_name}
                    </option>
                  ))}
                </select>
              </div>

              {id != undefined && auth.role === "admin" && (
                <div>
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
                </div>
              )}

              {id == undefined && (
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
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneStore;
