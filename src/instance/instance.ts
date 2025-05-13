import axios from "axios";

const token = localStorage.getItem("user_token");

export const instance = axios.create({
  baseURL: "https://reqres.in/api/",
  headers: {
    accept: "application/json",
    "x-api-key": "reqres-free-v1",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});
