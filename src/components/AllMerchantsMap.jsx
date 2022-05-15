import React from "react";
import { useState, useEffect } from "react";
import Map from "./Map";
import Marker from "./Marker";
import axios from "axios";

function AllMerchantsMap({ auth }) {
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
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [merchants]);

  const [zoom, setZoom] = useState(2); // initial zoom
  const [center, setCenter] = useState({
    lat: 51.477928,
    lng: -0.001545,
  });

  useEffect(() => {
    let coords = null;

    coords = new window.google.maps.LatLng(
      parseFloat(center.lat),
      parseFloat(center.lng)
    );

    if (coords && coords.lat()) {
      setCenter(coords.toJSON());
    }
  }, []);

  const onIdle = (m) => {
    setZoom(m.getZoom());
    if (m.getCenter()) {
      setCenter(m.getCenter().toJSON());
    }
  };

  return (
    <section className="intro">
      <div className="mask d-flex align-items-center h-100 gradient-custom">
        <div className="container-fluid" style={{ padding: 0 }}>
          <div className="row justify-content-center" style={{ margin: 0 }}>
            <div className="col-12 col-sm-12 col-xl-12" style={{ padding: 0 }}>
              <div className="card">
                <div className="col-12">
                  <Map
                    center={center}
                    onIdle={onIdle}
                    zoom={zoom}
                    disableDefaultUI={true}
                    style={{
                      height: "400px",
                      position: "relative",
                    }}
                  >
                    {merchants == null ? (
                      <></>
                    ) : (
                      merchants.map((merchant) => (
                        <Marker
                          merchant={merchant}
                          key={merchant.id}
                          position={
                            new window.google.maps.LatLng(
                              parseFloat(merchant.latitude),
                              parseFloat(merchant.longitude)
                            )
                          }
                        />
                      ))
                    )}
                  </Map>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllMerchantsMap;
