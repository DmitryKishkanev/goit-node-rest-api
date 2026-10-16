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

// update
authRouter.patch(
  "/users",
  helpers.authenticate,
  helpers.validateBody(usersSchemas.schemas.updateSubscriptionSchema),
  ctrl.updateStatusUser,
);

// current
authRouter.get("/current", helpers.authenticate, ctrl.getCurrent);

// logout
authRouter.post("/logout", helpers.authenticate, ctrl.logout);

// update avatar
authRouter.patch(
  "/avatars",
  helpers.authenticate,
  helpers.upload.single("avatar"),
  ctrl.updateAvatar,
);

export default authRouter;
