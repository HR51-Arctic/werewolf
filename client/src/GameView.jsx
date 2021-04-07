import React, { useState, useEffect } from 'react';
import Voting from './Voting.jsx';


// const handleVote = (gameState, day, id) => {
//   if (gameState.players[id].role === 'werewolf' && !day) {
//     return (
//       <Werewolf />
//     )
//   } else if (gameState.players[id].role === 'doctor' ) {
//     return (
//       <Doctor />
//     )
//   } else if (gameState.players[id].role === 'seer') {
//     return <Seer />
//   } else {
//     return <Villager />
//   }
// }

const GameView = ({ myId, gameState, timer, day, vote, docChoice, endGame, preGame, werewolves, villagers }) => {

  const [message, setMessage] = useState('');
  const [voting, setVoting] = useState(false);

  let role;
  gameState.players.forEach((player) => {
    if (player.id === myId) {
      role = player.role;
    }
  });


  return (
    <>
      <div style={{ backgroundColor: day ? 'yellow' : 'grey' }}>
        <div style={{ height: '250px', width: '50%', border: '3px solid black' }}>
          {endGame ? <h1>{endGame}</h1> : null}
        </div>
        <div style={{ height: '100px', width: '50%', border: '3px solid black' }}>
          <h1>You are a {role}</h1>
          <div>Time left: {timer} </div>
        </div>
        <div>Remaining Werewolves: {werewolves}</div>
        <div></div>
        <div>Remaining Villagers: {villagers}</div>
        <div style={{ height: '250px', width: '50%', border: '3px solid black' }}>
          <Voting gameState={gameState} day={day} myId={myId} vote={vote} docChoice={docChoice} preGame={preGame} role={role} />
        </div>
      </div>
    </>
  )
}
export default GameView;