import api from "./api";

const prefix = "/api/repos";

export function getAll() {
  return api.get(`${prefix}`);
}
