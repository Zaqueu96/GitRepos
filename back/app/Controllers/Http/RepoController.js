"use strict";

// /** @type {import('../Utils/axios')} */
// const axios = use("App/Services/Utils/axios");

/** @type {import('../../Services/github/ListRepos')} */
const ListRepos = use("App/Services/github/ListRepos");

class RepoController {
  async index({ request, response }) {
    try {
      const rr = await ListRepos.run();
      return response.status(200).send(rr);
    } catch (err) {
      console.log(err);
      return response.status(500).send({ message: "Internal Server Error" });
    }
  }
}

module.exports = RepoController;
