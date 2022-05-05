import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import OneMerchant from "./OneMerchant";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const MerchantsPage = () => {
  const [merchants, setMerchants] = useState();
  useEffect(() => {
    if (merchants == null) {
      axios.get("api/merchants").then((res) => {
        console.log(res.data);
        setMerchants(res.data.merchants);
      });
    }
  }, [merchants]);

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
      name: "Edit",
      selector: (row) => row.year,
      button: true,
      cell: (row) => (
        <button
          id={row.id}
          className="btn btn-secondary fas fa-user-edit edit-user"
          title="Edit user"
          onClick={clickHandler}
        ></button>
      ),
    },
    {
      name: "Remove",
      selector: (row) => row.year,
      button: true,
      cell: (row) => (
        <button
          id={row.id}
          className="btn btn-danger fas fa-user-times remove-user"
          data-toggle="modal"
          data-target="#deleteModal"
          data-placement="right"
          title="Remove user"
        ></button>
      ),
    },
  ];

  let navigate = useNavigate();
  function clickHandler(e) {
    //e.preventDefault();
    console.log(e.target.id);
    navigate(e.target.id);
  }

  const data = merchants;

  return (
    <div className="container-fluid ">
      <div className="col-xs-12 table-container">
        <div className="row">
          <div className="col-xs-12 col-md-12"></div>
          <DataTable
            title="Merchants"
            columns={columns}
            data={data}
            defaultSortField="id"
            direction="auto"
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            subHeaderAlign="right"
            subHeaderWrap
          />
        </div>
        <div className="row">
          <div className="col">
            <a href="#">
              <button className="btn btn-primary float-end" type="button">
                New Merchant
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
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
};

export default MerchantsPage;
