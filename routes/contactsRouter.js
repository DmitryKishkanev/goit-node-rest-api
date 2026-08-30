import express from "express";

import ctrl from "../controllers/contactsControllers.js";

import helpers from "../helpers/index.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getOneContact);

contactsRouter.post(
  "/",
  helpers.validateBody(createContactSchema),
  ctrl.createContact,
);

contactsRouter.put(
  "/:id",
  helpers.validateBody(updateContactSchema),
  ctrl.updateContact,
);

contactsRouter.delete("/:id", ctrl.deleteContact);

export default contactsRouter;
