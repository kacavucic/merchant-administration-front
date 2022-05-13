import React from "react";
import { useState, useEffect } from "react";
import Map from "./Map";
import Marker from "./Marker";

function StoreFinder({ merchant, clicks, addClicks }) {
  // const [clicks, setClicks] = useState([]);
  const [zoom, setZoom] = useState(14); // initial zoom
  const [center, setCenter] = useState({
    lat: 51.477928,
    lng: -0.001545,
  });

  useEffect(() => {
    let coords = null;
    if (!merchant) {
      coords = new window.google.maps.LatLng(
        parseFloat(center.lat),
        parseFloat(center.lng)
      );
    } else {
      coords = new window.google.maps.LatLng(
        parseFloat(merchant.latitude),
        parseFloat(merchant.longitude)
      );
    }

    addClicks([coords]);

    // setClicks([coords]);
    if (coords && coords.lat()) {
      setCenter(coords.toJSON());
    }
  }, []);

  const onClick = (e) => {
    addClicks([e.latLng]);
    // setClicks([e.latLng]);
  };

  const onIdle = (m) => {
    setZoom(m.getZoom());
    if (m.getCenter()) {
      setCenter(m.getCenter().toJSON());
    }
  };

  const form = (
    <div
      style={{
        padding: 1 + "rem",
        flexBasis: 250 + "px",
        height: 100 + "%",
        overflow: "auto",
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          addClicks([]);
          // etClicks([]);
        }}
      >
        Clear
      </button>
    </div>
  );

  return (
    <section className="intro">
      <div className="mask d-flex align-items-center h-100 gradient-custom mt-3">
        <div className="container-fluid" style={{ padding: 0 }}>
          <div className="row justify-content-center" style={{ margin: 0 }}>
            <div className="col-12 col-sm-12 col-xl-12" style={{ padding: 0 }}>
              <div className="card">
                <div className="col-12">
                  <Map
                    center={center}
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                    disableDefaultUI={true}
                    style={{
                      height: "400px",
                      position: "relative",
                    }}
                  >
                    {clicks.map((latLng, i) => (
                      <Marker key={i} position={latLng} />
                    ))}
                  </Map>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <div style={{ display: "flex", height: 100 + "%" }}>
    //   <Map
    //     center={center}
    //     onClick={onClick}
    //     onIdle={onIdle}
    //     zoom={zoom}
    //     style={{ width: "100%", height: "400px", position: "relative" }}
    //   >
    //     {clicks.map((latLng, i) => (
    //       <Marker key={i} position={latLng} />
    //     ))}
    //   </Map>

    //   {/* Basic form for controlling center and zoom of map. */}
    //   {form}
    // </div>
  );
}

export default StoreFinder;
