import express from "express";

import ctrl from "../controllers/contactsControllers.js";

import helpers from "../helpers/index.js";

import booksSchemas from "../services/contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

// contactsRouter.get("/:id", ctrl.getOneContact);

contactsRouter.post(
  "/",
  helpers.validateBody(booksSchemas.schemas.createContactSchema),
  ctrl.createContact,
);

// contactsRouter.put(
//   "/:id",
//   helpers.validateBody(booksSchemas.schemas.updateContactSchema),
//   ctrl.updateContact,
// );

// contactsRouter.delete("/:id", ctrl.deleteContact);

export default contactsRouter;
