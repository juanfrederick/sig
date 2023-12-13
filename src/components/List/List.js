import React, { useState, useEffect, createRef } from "react";
import { Grid, Typography } from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles.js";

const List = ({ places, childClicked }) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) =>
      Array(places.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4" style={{ paddingBottom: "16px" }}>
        Puskesmas Batam
      </Typography>

      <Grid container spacing={3} className={classes.list}>
        {places?.map((place, i) => (
          <Grid ref={elRefs[i]} key={i} item xs={12}>
            <PlaceDetails
              selected={Number(childClicked) === i}
              refProp={elRefs[i]}
              place={place}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
