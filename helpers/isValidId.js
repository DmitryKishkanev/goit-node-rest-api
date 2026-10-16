import { isValidObjectId } from "mongoose";

import helpers from "./index.js";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(helpers.HttpError(400, `${id} is not valid id`));
  }
  next();
};

export default isValidId;
