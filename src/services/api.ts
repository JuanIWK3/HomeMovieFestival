import axios from "axios";

export const baseURL = "https://homemoviefestival.herokuapp.com";

export const api = axios.create({
  baseURL: baseURL,
});
