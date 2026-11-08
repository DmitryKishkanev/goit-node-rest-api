import { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({
  port: 5000,
});

// Массив для хранения всех сокетов
const socketList = [];

// Объект socket - принимает\отправляет сообщения фронту, который подключился
wsServer.on("connection", (socket) => {
  // Пушим сокет после каждого подклюяения
  socketList.push(socket);

  setTimeout(() => {
    // Через 3 сек. Отправляем сообщение фронту, который только что подключился
    socket.send("Welcome to web-socket server");
  }, 3000);
  // console.log("New frontend connected");

  // Отправляем сообщение всем подключённым, кроме того кто только что подключился
  socketList.forEach((item) => {
    if (item !== socket) {
      item.send("New member connect");
    }
  });
});
