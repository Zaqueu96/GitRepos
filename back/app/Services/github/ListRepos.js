/** @type {import('../Utils/axios')} */
const axios = use("App/Services/Utils/axios");

class ListRepos {
  async run() {
    const { data } = await axios.get("/search/repositories",{params: {q:"page=1&per_page=10"}});
    return data;
  }
}

module.exports = new ListRepos();
