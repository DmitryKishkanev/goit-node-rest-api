import { Server } from "socket.io";
import { createServer } from "http";

// Создаём http сервер
const httpServer = createServer();

// Создаём io сервер на основе httpServer и разрешить подключения - origin: "*" с других портов
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Вешаем слушателя событий "connection"
io.on("connection", (socket) => {
  // При новом подключении с фронта выводим в консоль сообщение
  console.log("New frontend connect");

  // Принимаем message с типом 'chat-message' на бэкенде
  socket.on("chat-message", (message) => {
    // Отправляет сообщение всем кроме себя
    socket.broadcast.emit("chat-message", message);
  });
});

// Изапускаем httpServer
httpServer.listen(3001);
