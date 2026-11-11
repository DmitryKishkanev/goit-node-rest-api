import express from "express";

import ctrl from "../controllers/contactsControllers.js";

import helpers from "../helpers/index.js";

import booksSchemas from "../services/contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", helpers.isValidId, ctrl.getOneContact);

contactsRouter.post(
  "/",
  helpers.validateBody(booksSchemas.schemas.createContactSchema),
  ctrl.createContact,
);

contactsRouter.put(
  "/:id",
  helpers.isValidId,
  helpers.validateBody(booksSchemas.schemas.updateContactSchema),
  ctrl.updateContact,
);

contactsRouter.patch(
  "/:id/favorite",
  helpers.isValidId,
  helpers.validateBody(booksSchemas.schemas.updateFavoriteSchema),
  ctrl.updateStatusContact,
);

contactsRouter.delete("/:id", helpers.isValidId, ctrl.deleteContact);

export default contactsRouter;
