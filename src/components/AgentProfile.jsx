import React from "react";
import { DotSpinner } from "@uiball/loaders";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Waveform } from "@uiball/loaders";

function AgentProfile({ auth }) {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [agent, setAgent] = useState({
    id: null,
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    gender: "",
    age: "",
    store_id: "",
  });
  const [stores, setStores] = useState();

  useEffect(() => {
    if (stores == null) {
      var data = "";

      var config = {
        method: "get",
        url: "http://127.0.0.1:8000/api/stores",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setStores(response.data.stores);
          setLoading(false);
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
        url: "http://127.0.0.1:8000/api/agents/" + id,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log("KACAAAAAAAAAAa");
          console.log(JSON.stringify(response.data));
          setAgent({
            id: response.data.agent.id,
            first_name: response.data.agent.first_name,
            last_name: response.data.agent.last_name,
            phone_number: response.data.agent.phone_number,
            email: response.data.agent.email,
            gender: response.data.agent.gender,
            age: response.data.agent.age,
            store_id: response.data.agent.store.id,
          });
          setLoading(false);
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
      setLoading(true);
      var data = "";

      var config = {
        method: "get",
        url: "http://127.0.0.1:8000/api/agents/" + id,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          response.data.agent.store_id = response.data.agent.store.id;
          setAgent(response.data.agent);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });

      setDisabled(true);
    }
  }

  function handleInput(event) {
    setAgent({ ...agent, [event.target.name]: event.target.value });
    console.log("kaca" + JSON.stringify(agent));
  }

  function handleUpdate(e) {
    setLoading(true);
    e.preventDefault();
    var data = JSON.stringify({
      first_name: agent.first_name,
      last_name: agent.last_name,
      phone_number: agent.phone_number,
      email: agent.email,
      gender: agent.gender,
      age: agent.age,
      store_id: agent.store_id,
    });

    var config = {
      method: "put",
      url: "http://127.0.0.1:8000/api/agents/" + agent.id,
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
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  let navigate = useNavigate();

  function handleCreate(e) {
    e.preventDefault();
    var data = JSON.stringify({
      first_name: agent.first_name,
      last_name: agent.last_name,
      address: agent.address,
      phone_number: agent.phone_number,
      email: agent.email,
      gender: agent.gender,
      age: agent.age,
      store_id: agent.store_id,
    });

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/agents",
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
            {loading && (
              <div className="d-flex justify-content-center">
                <DotSpinner size={40} speed={0.9} color="black" />
              </div>
            )}
            {!loading && (
              <form onSubmit={id != undefined ? handleUpdate : handleCreate}>
                {id != undefined ? (
                  <div className="row">
                    <p className="lead fw-normal mb-0 ">
                      Agent: {agent.first_name + " " + agent.last_name}
                      <br></br>
                    </p>
                  </div>
                ) : (
                  <div className="row">
                    <p className="lead fw-normal mb-0 ">Create New Agent</p>
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
                      defaultValue={agent.id}
                      readOnly
                    />
                  </div>
                ) : (
                  <></>
                )}

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="store_id">
                    Store
                  </label>
                  <select
                    className="form-select"
                    id="store_id"
                    name="store_id"
                    value={agent.store_id}
                    required
                    disabled={id != undefined ? disabled : false}
                    onChange={handleInput}
                  >
                    <option className="placeholder" key={null} value={null}>
                      -- select a store --
                    </option>
                    {stores?.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.display_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="form-control form-control-lg"
                    placeholder="Enter first name"
                    value={agent.first_name}
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
                  <label className="form-label" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="form-control form-control-lg"
                    placeholder="Enter last name"
                    value={agent.last_name}
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
                  <label className="form-label" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    className="form-control form-control-lg"
                    placeholder="Enter age"
                    value={agent.age}
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
                  <label className="form-label" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={agent.gender}
                    required
                    disabled={id != undefined ? disabled : false}
                    onChange={handleInput}
                  >
                    <option hidden  key={null} value={null}>
                      -- select a gender --
                    </option>
                    <option key={"Female"} value={"female"}>
                      Female
                    </option>
                    <option key={"Male"} value={"male"}>
                      Male
                    </option>
                  </select>
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
                    value={agent.phone_number}
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
                    value={agent.email}
                    required
                    maxLength="50"
                    readOnly={id != undefined ? disabled : false}
                    onChange={handleInput}
                  />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentProfile;
