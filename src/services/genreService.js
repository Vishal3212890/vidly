import http from "./httpService";
import { apiUrl } from "../config.json";

const endpoint = `${apiUrl}/genres`;

export async function getGenres() {
  return await http.get(endpoint);
}
