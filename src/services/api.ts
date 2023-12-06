
import axios from "axios";

export const api = axios.create({
  baseURL: "https://labsdayapp.codegarden.com.br/api",
});
