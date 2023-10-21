import http from "./httpService";
import { apiUrl } from "../config.json";

const endpoint = `${apiUrl}/movies`;

export async function getMovies() {
  return await http.get(endpoint);
}

export async function getMovie(id) {
  return await http.get(`${endpoint}/${id}`);
}

export async function saveMovie(movie) {
  delete movie._id;
  const { data } = await http.post(endpoint, movie);
  return data;
}

export async function updateMovie(id, movie) {
  delete movie._id;
  const { data } = await http.put(`${endpoint}/${id}`, movie);
  return data;
}

export async function deleteMovie(id) {
  const { data } = await http.delete(`${endpoint}/${id}`, id);
  return data;
}
