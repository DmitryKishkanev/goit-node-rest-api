import contactsService from "../services/contactsServices.js";

import helpers from "../helpers/index.js";

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);

  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);

  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export default {
  getAllContacts: helpers.ctrlWrapper(getAllContacts),
  getOneContact: helpers.ctrlWrapper(getOneContact),
  createContact: helpers.ctrlWrapper(createContact),
  updateContact: helpers.ctrlWrapper(updateContact),
  deleteContact: helpers.ctrlWrapper(deleteContact),
};
