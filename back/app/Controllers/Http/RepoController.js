"use strict";

// /** @type {import('../Utils/axios')} */
// const axios = use("App/Services/Utils/axios");

/** @type {import('../../Services/github/ListRepos')} */
const ListRepos = use("App/Services/github/ListRepos");

class RepoController {
  async index({ request, response }) {
    try {
      const { page, limit, language } = request.only([
        "page",
        "limit",
        "language",
      ]);
      const rr = await ListRepos.run({ page, limit, language });
      return response.status(200).send(rr);
    } catch (err) {
      return response
        .status(500)
        .send({ message: "Internal Server Error", error: err });
    }
  }
}

module.exports = RepoController;
