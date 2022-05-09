import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, Link } from "react-router-dom";
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

function MerchantsPage({ user, token }) {
  const [merchants, setMerchants] = useState();

  useEffect(() => {
    if (merchants == null) {
      axios.get("api/merchants").then((res) => {
        console.log(res.data);
        setMerchants(res.data.merchants);
      });
    }
  }, [merchants]);

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
      url: "http://127.0.0.1:8000/api/merchants/" + idToDelete,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(merchants));
        // console.log(JSON.stringify(idToDelete));
        console.log(JSON.stringify(response.data));
        const del = merchants.filter((merchant) => idToDelete != merchant.id);
        setMerchants(del);
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
      name: "Info",
      selector: (row) => row.year,
      button: true,
      cell: (row) => (
        <IconButton
          id={row.id}
          title="Merchant information"
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
            title="Delete merchant"
            onClick={handleOpenDeleteDialog}
          >
            <DeleteIcon sx={{ color: red[500] }} />
          </IconButton>
        </div>
      ),
    },
  ];

  // const data = merchants;

  let navigate = useNavigate();
  function handleOpenInfoPage(e) {
    e.preventDefault();
    console.log(e.currentTarget.id);
    navigate(e.currentTarget.id);
  }

  function handleOpenNewMerchantPage(e) {
    e.preventDefault();
    console.log(e.currentTarget.id);
    navigate("newMerchant");
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
              title="Merchants"
              columns={columns}
              data={merchants}
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
              {/* <Link to="newMerchant"> */}
                <button className="btn btn-primary float-end" type="button" onClick={handleOpenNewMerchantPage}>
                  New Merchant
                </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={handleCloseDeleteDialog}>
          <DialogTitle id="alert-dialog-title">
            {"Delete this merchant?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Merhant will be permanentrly deleted.
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

  // <div>
  //   {merchants == null ? (
  //     <></>
  //   ) : (
  //     merchants.map((merchant) => (
  //       <OneMerchant merchant={merchant} key={merchant.id} />
  //     ))
  //   )}
  // </div>
}

export default MerchantsPage;
