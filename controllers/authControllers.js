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

  console.log(process.env.SECRET_KEY);
  console.log(SECRET_KEY);

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({
    token,
  });
};

export default {
  register: helpers.ctrlWrapper(register),
  login: helpers.ctrlWrapper(login),
};
