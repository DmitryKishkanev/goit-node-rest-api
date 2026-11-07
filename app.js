import { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({
  port: 5000,
});

wsServer.on("connection", () => {
  console.log("New frontend connected");
});
