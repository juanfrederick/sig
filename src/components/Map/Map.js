/* eslint-disable no-undef */
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography } from "@material-ui/core";

import mapStyles from "../../mapStyles";
import useStyles from "./styles.js";
import Marker from "./Marker.js";

const Map = ({ coords, places, setCoords, setChildClicked, location }) => {
  const classes = useStyles();
  // const [destination, setDestination] = useState();

  const apiIsLoaded = (map, maps) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const destination = { lat: 1.1454597394600972, lng: 104.02822995479345 };

    directionsService.route(
      {
        origin: location,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },

      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

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
        onChildClick={(child) => setChildClicked(child)}
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
        {places.length &&
          places.map((place, i) => (
            <button
              className={classes.markerContainer}
              lat={Number(place.lat)}
              lng={Number(place.long)}
              key={i}
              // onClick={() =>
              //   setDestination({
              //     lat: Number(place.lat),
              //     lng: Number(place.long),
              //   })
              // }
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
