/*
1. Response - status code 200
2. Return token
3. Return user with two fields: email, subscription and a typeof - string
*/

import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ctrl from "./authControllers.js";
import usertModel from "../services/user.js";

describe("test login function", () => {
  test("Response - status code 200", async () => {
    const req = {
      body: {
        email: "test@gmail.com",
        password: "123456",
      },
    };

    const res = {
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

    await ctrl.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
