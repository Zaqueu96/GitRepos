"use strict";
const languages = require("../utils/languages")
const { test, trait } = use("Test/Suite")("Repos Controller");

trait("Test/ApiClient");

test("List Repos Default", async ({ assert, client }) => {
  const { body, status } = await client.get("/api/repos").end();
  const { items } = body;
  assert.equal(200, status);
  assert.equal(items.length, 40);
}).timeout(20000);

test("List Repos by Limit", async ({ assert, client }) => {
  const limit = Math.round(Math.random() * 100);
  const { body, status } = await client
    .get("/api/repos")
    .query({ limit, page: 8 })
    .end();

  const { items } = body;
  assert.equal(200, status);
  assert.equal(items.length, limit);
}).timeout(20000);

languages.forEach((lng) => {
  test(`Filter Repos by Language: [${lng}]`, async ({ assert, client }) => {
    const limit = Math.round(Math.random() * 100);
    const { body, status } = await client
      .get("/api/repos")
      .query({ limit, language: lng })
      .end();
    const { items } = body;
    const item = items[0];

    assert.equal(200, status);
    assert.equal(item["language"], lng);
    assert.equal(items.length, limit);
  }).timeout(20000);
});
