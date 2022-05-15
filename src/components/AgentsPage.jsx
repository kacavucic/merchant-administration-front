import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import OneAgent from "./OneAgent";
import { useNavigate, Link, useParams } from "react-router-dom";

function AgentsPage({ auth }) {
  const [agents, setAgents] = useState();
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    if (agents == null) {
      if (id == undefined) {
        var data = "";

        var config = {
          method: "get",
          url: "http://127.0.0.1:8000/api/agents",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            setAgents(response.data.agents);
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        var data = "";

        var config = {
          method: "get",
          url: "http://127.0.0.1:8000/api/stores/" + id + "/agents",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            setAgents(response.data.agents);
            console.log(id);
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }, [agents, id]);

  let navigate = useNavigate();
  function handleOpenNewAgentPage() {
    console.log("novi agent");
    navigate("/newAgent");
  }

  const [searchParam, setSearchParam] = useState("");

  function handleInput(event) {
    setSearchParam({ ...searchParam, [event.target.name]: event.target.value });
  }

  function handleSearch(e) {
    e.preventDefault();
    console.log(JSON.stringify(searchParam));
    var config = {
      method: "get",
      url:
        "http://127.0.0.1:8000/api/agents?last_name=" +
        (searchParam.last_name || "") +
        "&sort_by=" +
        (searchParam.sort_by || ""),
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    };

    axios(config)
      .then(function (response) {
        setAgents(response.data.agents);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleSortSelect(e) {
    handleInput(e);
    var config = {
      method: "get",
      url:
        "http://127.0.0.1:8000/api/agents?last_name=" +
        (searchParam.last_name || "") +
        "&sort_by=" +
        (e.target.value || ""),
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    };

    axios(config)
      .then(function (response) {
        setAgents(response.data.agents);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <header className="mb-2">
        <div>
          <div className="row ms-2 me-2">
            <div className="col-md-4">
              <form className="mt-3" onSubmit={handleSearch}>
                <div className="row">
                  <div className="col-8">
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      className="form-control form-control"
                      placeholder="Search by last name"
                      maxLength="50"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-4">
                    <div className="text-center text-lg-start ">
                      <button
                        type="submit"
                        className="btn btn-secondary  float-start"
                        style={{
                          paddingLeft: 2.5 + "rem",
                          paddingRight: 2.5 + "rem",
                        }}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-2">
              <select
                className="form-select mt-3"
                id="sort_by"
                name="sort_by"
                value={searchParam.sort_by}
                onChange={handleSortSelect}
              >
                <option hidden key={null} value={null}>
                  -- sort by --
                </option>
                <option key="id" value="id">
                  ID
                </option>
                <option key="id_desc" value="id_desc">
                  ID (desc)
                </option>
                <option key="first_name" value="first_name">
                  First name
                </option>
                <option key="first_name_desc" value="first_name_desc">
                  First name (desc)
                </option>
                <option key="last_name" value="last_name">
                  Last name
                </option>
                <option key="last_name_desc" value="last_name_desc">
                  Last name (desc)
                </option>
              </select>
            </div>
            <div className="col-md-4 ms-auto ">
              {auth.role === "admin" ? (
                <button
                  className="btn btn-primary  mb-3 mt-3 float-end"
                  onClick={handleOpenNewAgentPage}
                >
                  New Agent
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="row row-cols-1 row-cols-md-4 g-4 ms-2 me-2 mb-2">
        {agents == null ? (
          <></>
        ) : (
          agents.map((agent) => (
            <OneAgent
              agent={agent}
              key={agent.id}
              auth={auth}
              agents={agents}
              setAgents={setAgents}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AgentsPage;
