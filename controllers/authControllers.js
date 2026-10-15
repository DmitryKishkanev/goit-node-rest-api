import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
// Создаём __dirname - вручную
import { fileURLToPath } from "url";
import fs from "fs/promises";
import userModel from "../models/user.js";
import helpers from "../helpers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к папке public. "../" - подняться на уровень выше
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.User.findOne({ email });

  if (user) {
    throw helpers.HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  // Создаём временную аватарку
  const avatarURL = gravatar.url(email);

  const newUser = await userModel.User.create({
    ...req.body,
    password: hashPassword,
    // Добавляем аватарку в базу при регистрации
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.User.findOne({ email });
  if (!user) {
    throw helpers.HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw helpers.HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await userModel.User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await userModel.User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  // Создаём уникальное имя для аватарки, добавляя к ней id пользователя
  const filename = `${_id}_${originalname}`;
  // Создаём новый путь включая имя файла (файл переименован)
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  // Сохраняем новый путь (где находится аватарка), включая имя файла, чтобы передать его в базу данных
  const avatarURL = path.join("avatars", filename);
  // Передаём новый путь (где находится аватарка) в базу данных
  await userModel.User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default {
  register: helpers.ctrlWrapper(register),
  login: helpers.ctrlWrapper(login),
  getCurrent: helpers.ctrlWrapper(getCurrent),
  logout: helpers.ctrlWrapper(logout),
  updateAvatar: helpers.ctrlWrapper(updateAvatar),
};
