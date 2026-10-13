import express from "express";

import ctrl from "../controllers/contactsControllers.js";

import helpers from "../helpers/index.js";

import booksSchemas from "../services/contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", helpers.authenticate, ctrl.getAllContacts);

contactsRouter.get(
  "/:id",
  helpers.authenticate,
  helpers.isValidId,
  ctrl.getOneContact,
);

contactsRouter.post(
  "/",
  helpers.authenticate,
  helpers.validateBody(booksSchemas.schemas.createContactSchema),
  ctrl.createContact,
);

contactsRouter.put(
  "/:id",
  helpers.authenticate,
  helpers.isValidId,
  helpers.validateBody(booksSchemas.schemas.updateContactSchema),
  ctrl.updateContact,
);

contactsRouter.patch(
  "/:id/favorite",
  helpers.authenticate,
  helpers.isValidId,
  helpers.validateBody(booksSchemas.schemas.updateFavoriteSchema),
  ctrl.updateStatusContact,
);

contactsRouter.delete(
  "/:id",
  helpers.authenticate,
  helpers.isValidId,
  ctrl.deleteContact,
);

export default contactsRouter;
