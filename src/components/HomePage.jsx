import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from "@mui/icons-material/Badge";

function HomePage() {
  return (
    <>
      <header className="masthead">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center text-white">
                <h1 className="mb-5">Merchant Administration</h1>
                <h3>
                  Merchant administration represents the system for registration
                  and manipulation of both merchants and their stores.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="features-icons bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <h3>Merchants</h3>
                <p className="lead mb-0">
                  Merchants are people or companies that perform the sale of
                  different types of products. These can be auto stores,
                  electronic stores, retail companies, FMCG, or other merchant
                  types.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <h3>Stores</h3>
                <p className="lead mb-0">
                  Each merchant can have one or more stores or places where
                  goods are sold. These can be physical locations like shopping
                  mall stores, boutiques, or online channels.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <h3>Agents</h3>
                <p className="lead mb-0">
                  Each store can have one or more agents as their employees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
