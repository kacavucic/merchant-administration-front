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

function StoresPage({ auth }) {
  let { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (id == undefined) {
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
          console.log(id);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      var data = "";

      var config = {
        method: "get",
        url: "http://127.0.0.1:8000/api/merchants/" + id + "/stores",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setStores(response.data.stores);
          console.log(id);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [id]);

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
        Authorization: "Bearer " + auth.token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
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
      omit: id == undefined ? false : true,
      selector: (row) => row.merchant.display_name,
      cell: (row) => (
        <Link title="Merchant information" to={"/merchants/" + row.merchant.id}>
          {row.merchant.display_name}
        </Link>
      ),
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
      omit: auth.role === "user",
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
    navigate("/stores/" + e.currentTarget.id);
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
        "http://127.0.0.1:8000/api/stores?display_name=" + (searchParam.display_name || "") +
        "&sort_by=" +
        (searchParam.sort_by || ""),
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    };

    axios(config)
      .then(function (response) {
        setStores(response.data.stores);
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
        "http://127.0.0.1:8000/api/stores?display_name=" +
        (searchParam.display_name || "") +
        "&sort_by=" +
        (e.target.value || ""),
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    };

    axios(config)
      .then(function (response) {
        setStores(response.data.stores);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleOpenNewStorePage(e) {
    e.preventDefault();
    console.log(e.currentTarget.id);
    navigate("/newStore");
  }

  // const [pending, setPending] = useState(true);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setPending(false);
  //   }, 2000);
  //   return () => clearTimeout(timeout);
  // }, []);

  function displayStoreName(stores) {
    if (stores.length > 0) {
      return "Stores of " + stores[0].merchant.display_name;
    } else return "This merchant has no stores";
  }

  return (
    <>
      <div className="container-fluid ">
        <div className="col-xs-12 table-container">
          <div className="row">
            <div className="col-4">
            <form className="mt-3" onSubmit={handleSearch}>
                <div className="row">
                  <div className="col-8">
                    <input
                      type="text"
                      id="display_name"
                      name="display_name"
                      className="form-control form-control"
                      placeholder="Search by display name"
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
                      -- sort table by --
                    </option>
                <option key="id" value="id">
                  ID
                </option>
                <option key="id_desc" value="id_desc">
                  ID (desc)
                </option>
                <option
                  key="display_name"
                  value="display_name"
                >
                  Name
                </option>
                <option
                  key="display_name_desc"
                  value="display_name_desc"
                >
                  Name (desc)
                </option>
                <option
                  key="email"
                  value="email"
                >
                  Email
                </option>
                <option
                  key="email_desc"
                  value="email_desc"
                >
                  Email (desc)
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-12"></div>
            <DataTable
              title={id == undefined ? "Stores" : displayStoreName(stores)}
              columns={columns}
              data={stores}
              defaultSortField="id"
              direction="auto"
              fixedHeaderScrollHeight="300px"
              pagination
              responsive
              subHeaderAlign="right"
              subHeaderWrap
              progressPending={loading}
              progressComponent={
                <Waveform size={40} lineWeight={3.5} speed={1} color="black" />
              }
            />
          </div>
          {auth.role === "admin" ? (
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
          ) : (
            <></>
          )}
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
