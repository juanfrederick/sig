import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@material-ui/core";

// import useStyles from "./styles.js";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  // const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.image}
        title={place.nama}
      />
      <CardContent>
        <Typography gutterBottom>{place.nama}</Typography>
        <Typography gutterBottom>{place.lokasi}</Typography>
        <Typography gutterBottom>{place.jam}</Typography>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
