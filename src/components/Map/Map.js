/* eslint-disable no-undef */
import React, { useCallback, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography } from "@material-ui/core";

import mapStyles from "../../mapStyles";
import useStyles from "./styles.js";
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

// dia akan membaca semua data yang telah dibuat untuk di hitung lokasi mana yang paling dekat
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
  const [distance, setDistance] = useState(null);

  const getClosestLocation = useCallback(async () => {
    const temp = await findClosestLocation(location);
    // untuk menset lokasi dari puskesmas terdekat yang didapat
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
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);

          const calculatedDistance = result.routes[0].legs[0].distance.text;
          setDistance(calculatedDistance);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );

    return () => {
      directionsRenderer.setMap(null);
      directionsRenderer.setDirections(null);
    };
    // ketika lokasi berubah maka akan mengeload rute dari lokasi yang telah didapat
  }, [map, location, destination]);

  useEffect(() => {
    if (destination) {
      const { lat, lng } = destination;
      const selectedIndex = places.findIndex(
        (val) => lat === Number(val.lat) && lng === Number(val.long)
      );

      if (selectedIndex !== -1) {
        setChildClicked(selectedIndex);
      }
    }
  }, [destination, setChildClicked, places]);

  return (
    <div className={classes.mapContainer}>
      {/* untuk menampilkan maps */}
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
        onGoogleApiLoaded={({ map }) => {
          // ketika maps ngeload, dia akan mengambil lokasi terdekat
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
                // ketika di pencet akan merubah lokasi puskesmas yang telah dipilih
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
      </GoogleMapReact>
      <div className={classes.bottomContent}>
        <div className={classes.distance}>Jarak: {distance}</div>
        <button
          className={classes.closestBtn}
          onClick={() => {
            getClosestLocation();
          }}
        >
          Closest Location
        </button>
      </div>
    </div>
  );
};

export default Map;
