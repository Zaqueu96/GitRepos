import api from "./api";

const prefix = "/api/languages";

export function getAll() {
  return api.get(`${prefix}`);
}
