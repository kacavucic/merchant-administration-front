import React from "react";
import { useState, useEffect } from "react";
import { faShop } from "@fortawesome/free-solid-svg-icons";

function Marker(options) {
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (marker == null) {
      setMarker(
        new window.google.maps.Marker({
          icon: {
            path: faShop.icon[4].toString(),
            fillColor: "#fc0000",
            fillOpacity: 1,
            anchor: new window.google.maps.Point(
              faShop.icon[0] / 2, // width
              faShop.icon[1] // height
            ),
            // strokeWeight: 1,
            // strokeColor: "#ffffff",
            scale: 0.035,
          },
          animation: window.google.maps.Animation.DROP,
          title: options.merchant.display_name,
        })
      );
    }

    // remove marker from map on unmount
    return () => {
      if (marker != null) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  useEffect(() => {
    if (marker != null) {
      marker.setOptions(options);
      const contentString =
        '<div className="card h-100">' +
        '<div className="card-body">' +
        '<h5 className="card-title"> Name: ' +
        options.merchant.display_name +
        "</h5>" +
        '<ul className="list-group list-group-flush">' +
        '<li className="list-group-item"> Address: ' +
        options.merchant.address +
        "</li>" +
        '<li className="list-group-item"> Email: ' +
        options.merchant.email +
        "</li>" +
        '<li className="list-group-item"> Phone number: ' +
        options.merchant.phone_number +
        "</li>" +
        "</ul>" +
        "</div>" +
        "</div>";

      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          // map,
          shouldFocus: false,
        });
      });
    }
  }, [marker, options]);

  return null;
}

export default Marker;
