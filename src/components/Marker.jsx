import React from "react";
import { useState, useEffect } from "react";

function Marker(options) {
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (marker == null) {
      setMarker(new window.google.maps.Marker());
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
    }
  }, [marker, options]);

  return null;
}

export default Marker;
