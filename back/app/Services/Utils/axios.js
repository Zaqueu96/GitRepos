/** @type {import('axios')} */
const axios = use("axios");

var axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

module.exports = axiosInstance;
