import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
// Создаём __dirname - вручную
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

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

// upload.array("cover", 8) - если сохранять больше одного файла - сейчас указано - 8
// upload.fields([{name: "cover", maxCount: 1}, {name: "subcover", maxCount: 2}]) - ожидаем в разных полях разное кол-во файлов
// upload.single("cover") - означает, что мы ожидаем в поле cover один файл, остальные поля будут текстовыми - запишутся в req.body
app.post("/api/books", upload.single("cover"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
