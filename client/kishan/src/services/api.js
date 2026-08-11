import axios from "axios";

const API = axios.create({
  baseURL: "https://skillforgeai-26c3.onrender.com/api"
});

export default API;