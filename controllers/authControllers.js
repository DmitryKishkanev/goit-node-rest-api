import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { Jimp } from "jimp";
import usertModel from "../services/user.js";

import helpers from "../helpers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await usertModel.User.findOne({ email });

  if (user) {
    throw helpers.HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await usertModel.User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    newUser: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await usertModel.User.findOne({ email });

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
  await usertModel.User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateStatusUser = async (req, res) => {
  const { _id } = req.user;
  const result = await usertModel.User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw helpers.HttpError(404, "Not found");
  }

  res.json({
    email: result.email,
    subscription: result.subscription,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await usertModel.User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const image = await Jimp.read(tmpUpload);
  image.resize({
    w: 250,
    h: 250,
  });
  await image.write(tmpUpload);
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await usertModel.User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default {
  register: helpers.ctrlWrapper(register),
  login: helpers.ctrlWrapper(login),
  updateStatusUser: helpers.ctrlWrapper(updateStatusUser),
  getCurrent: helpers.ctrlWrapper(getCurrent),
  logout: helpers.ctrlWrapper(logout),
  updateAvatar: helpers.ctrlWrapper(updateAvatar),
};
