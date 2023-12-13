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
    flex: 1,
  },
  closestBtn: {
    padding: "10px 15px", // atur padding untuk memberikan ruang di dalam tombol
    fontSize: "1em", // ukuran font
    backgroundColor: "#3498db", // warna latar belakang
    color: "#ffffff", // warna teks
    border: "none", // hilangkan batas
    borderRadius: "5px", // radius sudut untuk tampilan yang lebih lembut
    cursor: "pointer", // tampilkan kursor tangan saat diarahkan
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // tambahkan efek bayangan
    transition: "background-color 0.3s", // animasi perubahan warna latar belakang
    margin: "8px 0", // tambahkan margin atas dan bawah
  },
  bottomContent: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: "20px",
  },
}));
