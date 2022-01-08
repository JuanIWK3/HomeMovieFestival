import axios from "axios";
// https://homemoviefestival.herokuapp.com

export const baseURL = "https://homemoviefestival.herokuapp.com";

export const api = axios.create({
  baseURL: baseURL,
});
