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

//verify
router.get("/verify/:verificationCode", authCtrl.verifyEmail);

//re_verify
router.post(
  "/verify",
  helpers.validateBody(usersSchemas.schemas.emailSchema),
  authCtrl.resendVerifyEmail,
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

// update avatar
router.patch(
  "/avatars",
  helpers.authenticate,
  helpers.upload.single("avatar"),
  authCtrl.updateAvatar,
);

export default router;
