import axios from "axios";

export const api = axios.create({
  baseURL: `https://homemoviefestival.herokuapp.com/`,
});
