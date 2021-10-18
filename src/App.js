import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'


import Game from './Components/Game';

import './App.css';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="display-4 text-center">Scoreboard</h1>
        <p className="lead text-center">Game night just got real!</p>
      </Jumbotron>
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