// import books from "../services/books/index.js";
import bookModel from "../models/book.js";

import helpers from "../helpers/index.js"; //ctrlWrapper

const getAll = async (req, res) => {
  // выполняем запрос за книгами с id человека, который делаетт запрос
  const { _id: owner } = req.user; // переименовуем id в owner

  //ПАГИНАЦИЯ
  // берём нужные параметры поиска
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await bookModel.Book.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  // const result = await bookModel.Book.find({}, "title author"); // вернуть только "title author"
  // const result = await bookModel.Book.find({}, "-createdAt -updatedAt"); //вернуть всё кроме "-createdAt -updatedAt"
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await bookModel.Book.findOne({ _id: id });
  const result = await bookModel.Book.findById(id);
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
  // выполняем добавление книги с id человека, который делаетт запрос
  const { _id: owner } = req.user; // переименовуем id в owner
  const result = await bookModel.Book.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw helpers.HttpError(404, error.message);
  //   }
  const { id } = req.params;
  const result = await bookModel.Book.findByIdAndUpdate(id, req.body, {
    new: true,
  }); // new: true - чтобы возвращался обновлённый объект
  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw helpers.HttpError(404, error.message);
  //   }
  const { id } = req.params;
  const result = await bookModel.Book.findByIdAndUpdate(id, req.body, {
    new: true,
  }); // new: true - чтобы возвращался обновлённый объект
  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await bookModel.Book.findByIdAndDelete(id);
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
  updateFavorite: helpers.ctrlWrapper(updateFavorite),
  deleteById: helpers.ctrlWrapper(deleteById),
};
