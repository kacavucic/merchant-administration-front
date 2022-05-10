import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, Link, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Waveform } from "@uiball/loaders";

function StoresPage({ user, token, merchant }) {
  // let { id } = useParams();

  const [stores, setStores] = useState();

  useEffect(() => {
    if (merchant == undefined) {
      axios.get("api/stores").then((res) => {
        console.log(res.data);
        setStores(res.data.stores);
      });
    } else {
      axios.get("api/merchants/" + merchant.id + "/stores").then((res) => {
        console.log(res.data);
        setStores(res.data.stores);
      });
    }
  }, [merchant]);

  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();

  function handleOpenDeleteDialog(e) {
    setIdToDelete(e.currentTarget.id);
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
      url: "http://127.0.0.1:8000/api/stores/" + idToDelete,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const del = stores.filter((store) => idToDelete != store.id);
        setStores(del);
        handleCloseDeleteDialog();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.display_name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Phone number",
      selector: (row) => row.phone_number,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Merchant",
      omit: merchant == undefined ? false : true,
      selector: (row) => (row.merchant && row.merchant.display_name) || "/",
      cell: (row) =>
        (row.merchant && (
          <Link
            title="Merchant information"
            to={"/merchants/" + row.merchant.id}
          >
            {row.merchant.display_name}
          </Link>
        )) ||
        "/",
    },
    {
      name: "Info",
      selector: (row) => row.year,
      button: true,
      cell: (row) => (
        <IconButton
          id={row.id}
          title="Store information"
          onClick={handleOpenInfoPage}
        >
          <InfoIcon />
        </IconButton>
      ),
    },
    {
      name: "Delete",
      selector: (row) => row.year,
      button: true,
      cell: (row) => (
        <div>
          <IconButton
            id={row.id}
            title="Delete store"
            onClick={handleOpenDeleteDialog}
          >
            <DeleteIcon sx={{ color: red[500] }} />
          </IconButton>
        </div>
      ),
    },
  ];

  let navigate = useNavigate();
  function handleOpenInfoPage(e) {
    e.preventDefault();
    console.log(e.currentTarget.id);
    navigate(e.currentTarget.id);
  }

  function handleOpenNewStorePage(e) {
    e.preventDefault();
    console.log(e.currentTarget.id);
    navigate("newStore");
  }

  const [pending, setPending] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="container-fluid ">
        <div className="col-xs-12 table-container">
          <div className="row">
            <div className="col-xs-12 col-md-12"></div>
            <DataTable
              title={
                merchant == undefined
                  ? "Stores"
                  : "Stores of " + merchant.display_name
              }
              columns={columns}
              data={stores}
              defaultSortField="id"
              direction="auto"
              fixedHeaderScrollHeight="300px"
              pagination
              responsive
              subHeaderAlign="right"
              subHeaderWrap
              progressPending={pending}
              progressComponent={
                <Waveform size={40} lineWeight={3.5} speed={1} color="black" />
              }
            />
          </div>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary float-end"
                type="button"
                onClick={handleOpenNewStorePage}
              >
                New Store
              </button>
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={handleCloseDeleteDialog}>
          <DialogTitle id="alert-dialog-title">
            {"Delete this store?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Store will be permanentrly deleted.
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

export default StoresPage;