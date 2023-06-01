/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

export const membershipApi = axios.create({
  baseURL: "https://6464e8359c09d77a62dde60e.mockapi.io",
});
