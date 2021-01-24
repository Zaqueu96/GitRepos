import api from "./api";

const prefix = "/api/repos";

export function getAll() {
  return api.get(`${prefix}`);
}

export function filter({ page = 1, limit = 40, language = null }) {
  return api.get(`${prefix}`, { params: { language, page, limit } });
}
