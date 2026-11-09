import { useState, useCallback, useEffect } from 'react';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';

import Chat from './components/Chat/Chat';
import ChatForm from './components/ChatForm/ChatForm';
import SigninChatForm from './components/SigninChatForm/SigninChatForm';

import style from './App.module.css';

// Вызываем метод connect (подключение к нашему server)
const socket = io.connect('http://localhost:3001');

function App() {
  const [nickname, setNickname] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat-message', message => {
      setMessages(prevMessage => {
        const newMessage = {
          id: nanoid(),
          type: 'user',
          message,
        };

        return [newMessage, ...prevMessage];
      });
    });
  }, []);

  const addNickname = useCallback(({ name }) => setNickname(name), []);

  const addMessage = useCallback(({ message }) => {
    setMessages(prevMessage => {
      const newMessage = {
        id: nanoid(),
        type: 'you',
        message,
      };

      return [newMessage, ...prevMessage];
    });

    // Отправляем message с типом 'chat-message' на бэкенд
    socket.emit('chat-message', message);
  }, []);

  return (
    <div className={style.app}>
      {!nickname && <SigninChatForm onSubmit={addNickname} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && <Chat items={messages} />}
    </div>
  );
}

export default App;
