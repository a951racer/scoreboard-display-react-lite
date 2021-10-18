import React from 'react'
import Table from 'react-bootstrap/Table'
import './Scores.css'

function Scores({players, scores, totals}) {
    players.sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
        }
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
      
        return 0;
    })

    if (totals) {
        totals.sort((a, b) => {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
                return -1;
            }
            if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
            }
        
            return 0;
        })
    }

    return (
        <>

            <table className='score-table'>
                <thead>
                    <tr>
                        <th>Round</th>
                        {
                            players.map((player) => {
                                return <th id={player.id}>{player.name}</th>
                            })
                        }
                    </tr>
                </thead>
                <tfoot>
                    <th className='footer'>Total Score</th>
                    { totals &&
                        (
                            totals.map(player => <th>{player.total}</th>)
                        )
                    }
                </tfoot>
                <tbody>
                    { scores ? 
                        (
                                    [...Object.values(scores)]
                                        .sort((a, b) => a.round - b.round)
                                        .map((round) => (
                                        <tr
                                            key={round.round}
                                            className="message-container"
                                        >
                                            <td>{round.round}</td>
                                            {
                                                players.map((player) => {
                                                    const currentPlayerScore = round.scores.find(score => score.playerName === player.name)
                                                    if (currentPlayerScore) {
                                                        return <td>{currentPlayerScore.score}</td>
                                                    } else {
                                                        return <td>-</td>
                                                    }
                                                })
                                            }
                                        </tr>
                                        ))
                        ) : (
                            <tr></tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default Scores
