import express from "express";

import authCtrl from "../controllers/authControllers.js";

import helpers from "../helpers/index.js";

import usersSchemas from "../models/user.js";

const router = express.Router();

// signup
router.post(
  "/register",
  helpers.validateBody(usersSchemas.schemas.registerSchema),
  authCtrl.register,
);

//signin
router.post(
  "/login",
  helpers.validateBody(usersSchemas.schemas.loginSchema),
  authCtrl.login,
);

// current
router.get("/current", helpers.authenticate, authCtrl.getCurrent);

//logout
router.post("/logout", helpers.authenticate, authCtrl.logout);

export default router;
