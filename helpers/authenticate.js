import jwt from "jsonwebtoken";
import helpers from "../helpers/index.js";
import usertModel from "../services/user.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(helpers.HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await usertModel.User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(helpers.HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch {
    next(helpers.HttpError(401));
  }
};

export default authenticate;
