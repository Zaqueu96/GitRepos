/** @type {import('../Utils/axios')} */
const axios = use("App/Services/Utils/axios");

class ListRepos {
  async run({ page = 0, limit: per_page = 40, language = null }) {
    //language:js
    const { data } = await axios.get("/search/repositories", {
      params: {
        q: language !== null ? `language:${language}` : "q",
        page,
        per_page,
      },
    });
    return data;
  }
}

module.exports = new ListRepos();
