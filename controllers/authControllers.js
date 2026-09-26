import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import helpers from "../helpers/index.js";

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.User.findOne({ email });

  if (user) {
    throw helpers.HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.User.create({
    ...req.body,
    password: hashPassword,
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

export default {
  register: helpers.ctrlWrapper(register),
  login: helpers.ctrlWrapper(login),
  getCurrent: helpers.ctrlWrapper(getCurrent),
  logout: helpers.ctrlWrapper(logout),
};
