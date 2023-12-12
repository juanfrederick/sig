import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { data as dummy } from "./constant/data";

const App = () => {
  const [coords, setCoords] = useState({});
  const [location, setLocation] = useState({});
  const [childClicked, setChildClicked] = useState(null);

  useEffect(() => {
    // untuk mendaptkan lokasi saat ini
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
        setLocation({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          {/* 
            ini untuk menampilkan data puskesmas sebelah kiri
            data di ambil dari dummy yang sudah di input
          */}
          <List childClicked={childClicked} places={dummy} />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* ini untuk memanggil component maps untuk ditampilkan di sebelah kanan */}
          <Map
            setChildClicked={setChildClicked}
            setCoords={setCoords}
            coords={coords}
            places={dummy}
            location={location}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
