import express from "express";

import ctrl from "../controllers/books.js";

import helpers from "../helpers/index.js";

import booksSchemas from "../schemas/index.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", helpers.validateBody(booksSchemas.addSchema), ctrl.add);

router.put(
  "/:id",
  helpers.validateBody(booksSchemas.addSchema),
  ctrl.updateById,
);

router.delete("/:id", ctrl.deleteById);

export default router;
