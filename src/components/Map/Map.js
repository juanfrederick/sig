/* eslint-disable no-undef */
import React, { useCallback, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography } from "@material-ui/core";

import mapStyles from "../../mapStyles";
import useStyles from "./styles.js";
import Marker from "./Marker.js";
import { data } from "../../constant/data.js";

const calculateDistance = (location1, location2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = (location2.lat - location1.lat) * (Math.PI / 180);
  const dLon = (location2.long - location1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(location1.lat * (Math.PI / 180)) *
      Math.cos(location2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const findClosestLocation = (location) => {
  let closestLocation;
  let minDistance = Number.MAX_VALUE;

  data.forEach((e) => {
    const distance = calculateDistance(location, e);
    if (distance < minDistance) {
      minDistance = distance;
      closestLocation = e;
    }
  });

  return closestLocation;
};

const Map = ({ coords, places, setCoords, setChildClicked, location }) => {
  const classes = useStyles();
  const [destination, setDestination] = useState(null);
  const [map, setMap] = useState(null);

  const getClosestLocation = useCallback(async () => {
    const temp = findClosestLocation(location);
    setDestination({ lat: Number(temp.lat), lng: Number(temp.long) });
  }, [location]);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: location,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },

      (result, status) => {
        console.log("🚀 ~ file: Map.js:70 ~ useEffect ~ result:", result);
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );

    return () => {
      directionsRenderer.setMap(null);
      directionsRenderer.setDirections(null);
    };
  }, [map, location, destination]);

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        center={coords}
        defaultZoom={15}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => setCoords({ lat: e.center.lat, lng: e.center.lng })}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={async ({ map }) => {
          setMap(map);
          getClosestLocation();
        }}
      >
        {places.length &&
          places.map((place, i) => (
            <button
              className={classes.markerContainer}
              lat={Number(place.lat)}
              lng={Number(place.long)}
              key={i}
              onClick={() => {
                setChildClicked(i);
                setDestination({
                  lat: Number(place.lat),
                  lng: Number(place.long),
                });
              }}
            >
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.nama}
                </Typography>
                <img className={classes.pointer} src={place.image1} alt="pic" />
              </Paper>
            </button>
          ))}

        <Marker position={location} title="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
