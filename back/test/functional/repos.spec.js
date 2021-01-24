"use strict";

const { test, trait } = use("Test/Suite")("Repos Controller");

trait("Test/ApiClient");

test("List Repos", async ({ assert, client }) => {
  const { body, status } = await client.get("/api/repos").end();

  const { items } = body;
  assert.equal(200, status);
  assert.equal(items.length, 10);
}).timeout(20000);
