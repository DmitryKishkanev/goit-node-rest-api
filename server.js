import mongoose from "mongoose";
import app from "./app.js";

import DB_HOST from "./config.js";

// const DB_HOST =
//   "mongodb+srv://Dmitry:fHSSUdFJof8LOAce@cluster0.appzis8.mongodb.net/books_reader";

// mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Server is running. Use our API on port: 3000");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1); // Эта команда закрывает запущенные процессы
  });
