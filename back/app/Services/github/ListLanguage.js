/** @type {import('../Utils/axios')} */
const axios = use("App/Services/Utils/axios");
class ListLanguage {
  async run() {
    return axios.get("/languages");
  }
}
module.exports = new ListLanguage();
