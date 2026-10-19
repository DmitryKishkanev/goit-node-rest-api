/*
1. Response - status code 200
2. Return token
3. Return user with two fields: email, subscription and a typeof - string
*/

import ctrl from "./authControllers.js";

describe("test login function", () => {
  test("Response - status code 200", async () => {
    expect(ctrl.login()).toBe(true);
  });
});
