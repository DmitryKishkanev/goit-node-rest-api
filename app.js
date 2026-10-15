import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import booksRouter from "./routes/books.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
// Middleware нужна - чтобы фронту одавать файлы. Означает, что если придёт запрос за статичным файлом - искать его в папке "public" (что бы отобразить сохранённый файл на фронте)
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });

export default app;
