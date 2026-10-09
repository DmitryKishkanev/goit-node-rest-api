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

//signin
authRouter.post(
  "/login",
  helpers.validateBody(usersSchemas.schemas.loginSchema),
  ctrl.login,
);

// current
authRouter.get("/current", helpers.authenticate, ctrl.getCurrent);

// logout
authRouter.post("/logout", helpers.authenticate, ctrl.logout);

export default authRouter;
