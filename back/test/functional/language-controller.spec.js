"use strict";

const { test, trait } = use("Test/Suite")("Language Controller");
trait("Test/ApiClient");

test("List Languages", async ({ assert, client }) => {
  const { body, status } = await client.get("/api/languages").end();
  assert.equal(status, 200);
  assert.equal(Array.isArray(body), true);
});
