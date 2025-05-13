import axios from "axios";

export const instance = axios.create({
  baseURL: "https://reqres.in/api/",
  headers: {
    accept: "application/json",
    "x-api-key": "reqres-free-v1",
  },
});
