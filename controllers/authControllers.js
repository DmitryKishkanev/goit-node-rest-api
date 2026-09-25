import userModel from "../models/user.js";
import helpers from "../helpers/index.js";

const register = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.User.findOne({ email });

  if (user) {
    throw helpers.HttpError(409, "Email already in use");
  }

  const newUser = await userModel.User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

export default {
  register: helpers.ctrlWrapper(register),
};
