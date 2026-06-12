import axios from "axios";

const API = axios.create({
  baseURL: "https://library-management-system-sche.onrender.com/api"
});

export default API;