import express from "express";

import ctrl from "../controllers/authControllers.js";

import helpers from "../helpers/index.js";

import usersSchemas from "../services/user.js";

const authRouter = express.Router();

//signup;
authRouter.post(
  "/register",
  helpers.validateBody(usersSchemas.schemas.registerSchema),
  ctrl.register,
);

export default authRouter;
