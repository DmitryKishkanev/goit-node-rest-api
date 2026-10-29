import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
// Создаём __dirname - вручную
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import userModel from "../models/user.js";
import helpers from "../helpers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к папке public. "../" - подняться на уровень выше
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.User.findOne({ email });

  if (user) {
    throw helpers.HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  // Создаём временную аватарку
  const avatarURL = gravatar.url(email);
  // Создаём verificationCode, что бы пердать его пользователю при регистрации
  const verificationCode = nanoid();

  const newUser = await userModel.User.create({
    ...req.body,
    password: hashPassword,
    // Добавляем аватарку в базу при регистрации
    avatarURL,
    // Записываем verificationCode в нового пользователя
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  };

  await helpers.sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await userModel.User.findOne({ verificationCode });
  if (!user) {
    throw helpers.HttpError(401, "Email not found");
  }

  await userModel.User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    message: "Email verify success",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.User.findOne({ email });
  if (!user) {
    throw helpers.HttpError(401, "Email not found");
  }

  if (user.verify) {
    throw helpers.HttpError(401, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: " Verify email send success",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.User.findOne({ email });
  if (!user) {
    throw helpers.HttpError(401, "Email or password invalid");
  }

  if (!user.verify) {
    throw helpers.HttpError(401, "Email not verified");
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
  verifyEmail: helpers.ctrlWrapper(verifyEmail),
  resendVerifyEmail: helpers.ctrlWrapper(resendVerifyEmail),
};
