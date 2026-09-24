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

export default router;
