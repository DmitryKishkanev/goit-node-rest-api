// import contactsService from "../services/contactsServices.js";
import contactModel from "../services/contact.js";

import helpers from "../helpers/index.js";

const getAllContacts = async (req, res) => {
  const result = await contactModel.Contact.find();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactModel.Contact.findById(id);

  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const result = await contactModel.Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactModel.Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactModel.Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactModel.Contact.findByIdAndDelete(id);
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
  updateStatusContact: helpers.ctrlWrapper(updateStatusContact),
  deleteContact: helpers.ctrlWrapper(deleteContact),
};
