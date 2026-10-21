/*
1. Response - status code 200
2. Response should contain token
3. Response should contain user object with email and subscription and a typeof - string
*/

import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ctrl from "./authControllers.js";
import usertModel from "../services/user.js";

describe("test login function", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: "test@gmail.com",
        password: "123456",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const user = {
      _id: "123",
      email: "test@gmail.com",
      password: "hashedPassword",
      subscription: "starter",
    };

    jest.spyOn(usertModel.User, "findOne").mockResolvedValue(user);

    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    jest.spyOn(jwt, "sign").mockReturnValue("fake_token");

    jest.spyOn(usertModel.User, "findByIdAndUpdate").mockResolvedValue({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Response - status code 200", async () => {
    await ctrl.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Response should contain token", async () => {
    await ctrl.login(req, res);

    const response = res.json.mock.calls[0][0];

    expect(response.token).toBeDefined();
  });

  test("Response should contain user object with email and subscription of type string", async () => {
    await ctrl.login(req, res);

    const response = res.json.mock.calls[0][0];

    expect(response.user.email).toEqual(expect.any(String));
    expect(response.user.subscription).toEqual(expect.any(String));
  });
});
