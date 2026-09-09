import mongoose from "mongoose";
import app from "./app.js";

const DB_HOST =
  "mongodb+srv://Dmitry:lfQPeaHge6QoIobL@cluster0.xqzdqum.mongodb.net/contacts_reader";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
