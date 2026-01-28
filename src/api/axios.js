import axios from "axios";

const api = axios.create({
  baseURL: "https://image-finder-backend-21l9.onrender.com",
});

export default api;
