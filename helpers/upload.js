import multer from "multer";
import path from "path";
// Создаём __dirname - вручную
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к папке temp. "../" - подняться на уровень выше
const tempDir = path.join(__dirname, "../", "temp");

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

export default upload;
