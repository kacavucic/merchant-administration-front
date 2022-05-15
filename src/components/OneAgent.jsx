import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate, Link, useParams } from "react-router-dom";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Waveform } from "@uiball/loaders";

function OneAgent({ agent, auth, agents, setAgents }) {
  const [imageUrl, setImageUrl] = useState("");

  let gender = agent.gender;

  useEffect(() => {
    var config = {
      method: "get",
      url:
        "https://fakeface.rest/face/json?gender=" +
        agent.gender +
        "&maximum_age=" +
        agent.age +
        "&minimum_age=25",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setImageUrl(response.data.image_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();

  function handleOpenDeleteDialog() {
    console.log("brisem");
    setIdToDelete(agent.id);
    setOpen(true);
  }

  function handleCloseDeleteDialog() {
    setIdToDelete(null);
    setOpen(false);
  }

  function handleDeleteRequest(e) {
    e.preventDefault();
    var data = "";

    var config = {
      method: "delete",
      url: "http://127.0.0.1:8000/api/agents/" + agent.id,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let idToDelete = agent.id;
        console.log("obrisn jupi");
        const del = agents.filter((agent) => idToDelete != agent.id);
        setAgents(del);
        // navigate(0);
        handleCloseDeleteDialog();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let navigate = useNavigate();
  function handleOpenInfoPage() {
    console.log("otvaram");
    navigate("/agents/" + agent.id);
  }

  function displayStoreName(stores) {
    if (stores.length > 0) {
      return "Stores of " + stores[0].merchant.display_name;
    } else return "This merchant has no stores";
  }

  return (
    <>
      <div className="col">
        <div className="card h-100">
          <div className="card-header">
            <img
              src={imageUrl}
              className="card-img-top"
              alt={agent.first_name + " " + agent.last_name}
            ></img>
          </div>

          <div className="card-body">
            <h5 className="card-title">
              {agent.first_name + " " + agent.last_name}
            </h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <PhoneIphoneIcon></PhoneIphoneIcon>
                {" " + agent.phone_number}
              </li>
              <li className="list-group-item">
                <EmailIcon></EmailIcon>
                {" " + agent.email}
              </li>
              <li className="list-group-item">
                <StoreIcon></StoreIcon>
                {" " + agent.store.display_name}
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary float-start"
              onClick={handleOpenInfoPage}
            >
              View Profile
            </button>
            {auth.role === "admin" ? (
              <button
                className="btn btn-danger float-end"
                onClick={handleOpenDeleteDialog}
              >
                Delete
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Dialog open={open} onClose={handleCloseDeleteDialog}>
          <DialogTitle id="alert-dialog-title">
            {"Delete this agent?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Agent will be permanentrly deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Disagree</Button>
            <Button onClick={handleDeleteRequest} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default OneAgent;
