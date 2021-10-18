import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Scores from './Scores'

import './Game.css'

function Game({ socket }) {
  const [game, setGame] = useState(null)
  const [players, setPlayers] = useState(null)
  const [scores, setScores] = useState(null)
  const [totals, setTotals] = useState(null)

  useEffect(() => {
    const gameListener = (game) => {
        if (game) {
          setGame({
              code: game.code.toUpperCase(),
              name: game.name
          });
          socket.emit('getPlayers')
        } else {
          setGame(null)
        }
      };

    const playerListener = (players) => {
        if (players) {
          setPlayers(players)
          socket.emit('getScores')
        } else {
          setPlayers(null)
        }
      };
  
    const scoreListener = (scores) => {
        if (scores) {
          setScores(scores)
        } else {
          setScores(null)
        }
      }

    const totalListener = (totals) => {
          if (totals) {
            setTotals(totals)
          } else {
            setTotals(null)
          }
      }

  socket.on('game', gameListener)
    socket.on('players', playerListener)
    socket.on('scores', scoreListener)
    socket.on('totals', totalListener)
    socket.emit('getGame')
    socket.emit('getPlayers')
    socket.emit('getScores')
    socket.emit('getTotals')

    return () => {
      socket.off('game', gameListener);
    };
  }, [socket]);

  return (
    <div>
      { game ? (
        <>
          <div className="message-list">
            <div className='game-name'>{game.name}</div>
            <div className='game-code'>{game.code}</div>
          </div>
          { players ? (
            <>
              <div className='h3'>Scores</div>
              <Scores players={players} scores={scores} totals={totals}/>
            </>
          ) : (
            <div>Waiting for players to join...</div>
          )}
        </>
    ) : (
      <>
        <div className='center-text'>
          <div>Waiting for game to start...</div>
          <Spinner animation="border" />
        </div>
      </>
        
      )}
    </div>
  );
}

export default Game