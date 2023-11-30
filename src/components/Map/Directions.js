import React, { useEffect } from "react";

const Directions = ({ map, origin, destination }) => {
  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    const request = {
      origin,
      destination,
      travelMode: "DRIVING", // or 'WALKING', 'BICYCLING', 'TRANSIT'
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      } else {
        console.error(`Error fetching directions: ${status}`);
      }
    });
  }, [map, origin, destination]);

  return null;
};

export default Directions;
