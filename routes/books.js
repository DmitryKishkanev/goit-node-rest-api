import express from "express";

import ctrl from "../controllers/books.js";

import helpers from "../helpers/index.js";

import booksSchemas from "../models/book.js";

const router = express.Router();

router.get("/", helpers.authenticate, ctrl.getAll);

router.get("/:id", helpers.authenticate, helpers.isValidId, ctrl.getById);

router.post(
  "/",
  helpers.authenticate,
  helpers.validateBody(booksSchemas.schemas.addSchema),
  ctrl.add,
);

router.put(
  "/:id",
  helpers.authenticate,
  helpers.isValidId,
  helpers.validateBody(booksSchemas.schemas.addSchema),
  ctrl.updateById,
);

router.patch(
  "/:id/favorite",
  helpers.authenticate,
  helpers.isValidId,
  helpers.validateBody(booksSchemas.schemas.updateFavoriteSchema),
  ctrl.updateFavorite,
);

router.delete("/:id", helpers.isValidId, ctrl.deleteById);

export default router;
