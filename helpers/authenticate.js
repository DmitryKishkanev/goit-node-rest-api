import jwt from "jsonwebtoken";
import helpers from "../helpers/index.js";
import userModel from "../models/user.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  // Деструктуризация массива [bearer, token] и split(" ") - разделяет строку по пробелу
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(helpers.HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await userModel.User.findById(id);

    if (!user || !token || user.token !== token) {
      next(helpers.HttpError(401));
    }

    //   фиксируем того, кто делает запрос
    req.user = user;
    next();
  } catch {
    next(helpers.HttpError(401));
  }
};

export default authenticate;
