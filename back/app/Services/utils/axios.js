/** @type {import('axios')} */
const axios = use("axios");

var axiosInstance = axios.create({
  baseURL: "https://api.github.com/repositories",
});

module.exports = axiosInstance;
