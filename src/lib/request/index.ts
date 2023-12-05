import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

const request = setupInterceptorsTo(
  axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export const requestWithoutAuth = setupInterceptorsTo(axios.create());

export default request;
