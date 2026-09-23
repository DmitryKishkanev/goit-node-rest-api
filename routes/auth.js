import express from "express";

import authCtrl from "../controllers/authControllers.js";

import helpers from "../helpers/index.js";

import userSchemas from "../models/user.js";

const router = express.Router();

// signup
// router.post(
//   "/register",
//   helpers.validateBody(userSchemas.schemas.registerSchema),
//   authCtrl.register,
// );

router.post(
  "/register",
  helpers.validateBody(userSchemas.schemas.registerSchema),
  authCtrl.register,
);

export default router;
