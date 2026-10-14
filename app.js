import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
// Создаём __dirname - вручную
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
// Middleware нужна - чтобы фронту одавать файлы. Означает, что если придёт запрос за статичным файлом - искать его в папке "public" (что бы отобразить сохранённый файл на фронте)
app.use(express.static("public"));

// Путь к папке temp
const tempDir = path.join(__dirname, "temp");

// Объект настроек указывает где хранить временные файлы
const multerConfig = multer.diskStorage({
  destination: tempDir,

  // Сохраняет файл не под тем именем, под которым он пришёл
  filename: (req, file, cb) => {
    // Вызываем cb и пеердаём ему первым аргументом null, а вторым - сохранять оригинальное имя
    cb(null, file.originalname);
  },
});

//  Middleware для сохранения (будет сохранять файлы в папке tempDir т.е. в temp под оригинальным именем)
const upload = multer({
  storage: multerConfig,
});

const books = [];

app.get("/api/books", (req, res) => {
  res.json(books);
});

// Путь к папке books
const booksDir = path.join(__dirname, "public", "books");
// upload.array("cover", 8) - если сохранять больше одного файла - сейчас указано - 8
// upload.fields([{name: "cover", maxCount: 1}, {name: "subcover", maxCount: 2}]) - ожидаем в разных полях разное кол-во файлов
// upload.single("cover") - означает, что мы ожидаем в поле cover один файл, остальные поля будут текстовыми - запишутся в req.body
// upload.single("cover") - означает, что файл ожидается в поле "cover"
app.post("/api/books", upload.single("cover"), async (req, res) => {
  // Берём из req.file старый путь включая имя файла
  const { path: tempUpload, originalname } = req.file;
  // Создаём новый путь включая имя файла
  const resultUpload = path.join(booksDir, originalname);
  // премещаем файл из временной папки в целевую папку
  await fs.rename(tempUpload, resultUpload);

  // Создаём путь, где находится нашь файл включая имя файла, для сохранения в базу данных
  const cover = path.join("books", originalname);

  // Создаём объект с новой книгой и записываем его в массив book, т.е. базу данных
  const newBook = {
    // Добавляем книге id
    id: nanoid(),
    // Распыляем тело запроса
    ...req.body,
    cover,
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
