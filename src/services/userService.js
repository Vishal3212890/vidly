import http from "./httpService";
import { apiUrl } from "../config.json";

const endpoint = `${apiUrl}/users`;

export function register(user) {
  return http.post(endpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
