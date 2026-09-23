import userModel from "../models/user.js";
import helpers from "../helpers/index.js";

const register = async (req, res) => {
  const newUser = await userModel.User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

export default {
  register: helpers.ctrlWrapper(register),
};
