import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@material-ui/core";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card elevation={6}>
      <div style={{ display: "flex" }}>
        <CardMedia
          style={{ height: 350, flex: 1 }}
          image={place.image1}
          title={place.nama}
        />
        <CardMedia
          style={{ height: 350, flex: 1 }}
          image={place.image2}
          title={place.nama}
        />
      </div>
      <CardContent>
        <Typography gutterBottom>{place.nama}</Typography>
        <Typography gutterBottom>{place.lokasi}</Typography>
        <Typography gutterBottom>
          <span style={{ color: "red" }}>Jam:</span> {place.jam}
        </Typography>
        <Typography gutterBottom>
          <span style={{ color: "red" }}>Jenis Layanan:</span>{" "}
          {place.jenis_layanan}
        </Typography>
        <Typography gutterBottom>
          <span style={{ color: "red" }}>Tenaga Kesehatan:</span>{" "}
          {place.tenaga_kesehatan}
        </Typography>
        <Typography gutterBottom>
          <span style={{ color: "red" }}>Kapasitas:</span> {place.kapasitas}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
