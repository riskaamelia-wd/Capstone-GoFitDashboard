/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";


const membershipApi = axios.create({
  baseURL: "https://6464e8359c09d77a62dde60e.mockapi.io",
});

const adminApi = axios.create({
  baseURL: "http://18.141.56.154:8000",
  headers: { Accept: "application/json" },
});

export { adminApi, membershipApi };

