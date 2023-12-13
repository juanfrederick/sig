import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
  },
  mapContainer: {
    height: "85vh",
    width: "100%",
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    background: "transparent",
    border: "none",
    outline: "none",

    "&:hover": { zIndex: 2, cursor: "pointer" },
  },
  pointer: {
    cursor: "pointer",
  },
  locationMarker: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
    backgroundColor: "#ffc107",
    padding: "5px",
    borderRadius: "50%",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  },
  distance: {
    fontSize: "1.5em",
    padding: "8px",
    border: "1px solid #ccc",
    margin: "8px 0",
    minWidth: "150px",
    textAlign: "center",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
}));
