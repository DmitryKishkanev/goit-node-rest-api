import { io } from "socket.io-client";

import Chat from "./components/Chat/Chat";
import ChatForm from "./components/ChatForm/ChatForm";
import SigninChatForm from "./components/SigninChatForm/SigninChatForm";

import "./App.css";

// Вызываем метод connect (подключение к нашему server)
const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="">
      <SigninChatForm />
      <ChatForm />
      <Chat />
    </div>
  );
}

export default App;
