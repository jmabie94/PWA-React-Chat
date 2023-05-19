// client/src/App.js

import './App.css';
import { useState, useEffect } from 'react';
import Home from './pages/home';
import Chat from './pages/chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';

// chatgpt refactor, heroku deployed but could not "GET '/'" route cause it wasn't local.
// the secondary refactor replaces this with the refactor with the useState/useEffect io() logic.
// const serverURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4000';
// const socket = io.connect(serverURL);

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  // another chatgpt refactor, adding a useEffect to change the socket connection
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    }
  }, []);
  // chatgpt refactor ends here

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
