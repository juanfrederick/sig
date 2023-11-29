import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography } from "@material-ui/core";

import mapStyles from "../../mapStyles";
import useStyles from "./styles.js";

const Map = ({ coords, places, setCoords, setChildClicked, location }) => {
  const classes = useStyles();

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
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
        }}
        yesIWantToUseGoogleMapApiInternals
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length &&
          places.map((place, i) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.lat)}
              lng={Number(place.long)}
              key={i}
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
            </div>
          ))}

        {/* <Marker
          position={location}
          title="My Marker"
        /> */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
