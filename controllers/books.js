import books from "../services/books/index.js";

import helpers from "../helpers/index.js"; //ctrlWrapper

const getAll = async (req, res) => {
  const result = await books.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await books.getById(id);
  if (!result) {
    throw helpers.HttpError(404, "Not found");
    // const error = new Error("Not found");
    // error.status = 404;
    // throw error;
    // return res.status(404).json({
    //   message: "Not found",
    // });
  }
  res.json(result);
};

const add = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw helpers.HttpError(404, error.message);
  //   }
  const result = await books.add(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw helpers.HttpError(404, error.message);
  //   }
  const { id } = req.params;
  const result = await books.updateById(id, req.body);
  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await books.deleteById(id);
  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }
  // res.status(204).send(); //если статус 204, то тело ответа предавать не нужно, оно не отобразится
  res.json({
    message: "Delete success",
  });
};

export default {
  getAll: helpers.ctrlWrapper(getAll),
  getById: helpers.ctrlWrapper(getById),
  add: helpers.ctrlWrapper(add),
  updateById: helpers.ctrlWrapper(updateById),
  deleteById: helpers.ctrlWrapper(deleteById),
};
