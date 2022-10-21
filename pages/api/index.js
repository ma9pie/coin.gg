import axios from "axios";

const { hostname } = window.location;

export default axios.create({
  // baseURL:
  //   hostname === "localhost" ? "http://localhost:8080" : "https://polypoli.kr",
  header: {
    "Content-Type": "application/json",
  },
});
