"use strict";
/** @type {import('../../Services/github/ListLanguage')} */
const ListLanguage = use("App/Services/github/ListLanguage");
class LanguageController {
  async index({ request, response }) {
    try {
      const { data } = await ListLanguage.run();
      return data;
    } catch (e) {
      return response.status(500).send({ message: "Internal Server Error" });
    }
  }
}

module.exports = LanguageController;
