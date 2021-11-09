import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Container from 'react-bootstrap/Container'

import Header from './Components/Header'
import Game from './Components/Game';

import './App.css';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <Container className="p-3">
      <Header />
      { socket ? (
        <>
          <div className="chat-container">
            <Game socket={socket} />
          </div>
        </>
    ) : (
        <div>Not Connected</div>
      )}
    </Container>
  );
}

export default App;