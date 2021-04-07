import React, { useState, useEffect } from 'react';
import Voting from './Voting.jsx';
import WerewolfChat from './WerewolfChat.jsx';


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

const GameView = ({ myId, gameState, timer, day, vote, docChoice, endGame, preGame, werewolves, villagers, werewolfMessages, handleWerewolfChat }) => {

  const [message, setMessage] = useState('');
  const [voting, setVoting] = useState(false);

  console.log(gameState.players)

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
          {preGame ? <div>Welcome to werewolf! This is a small and tight-knit town, so introduce yourselves and get to know each other! But be careful, some may not be what they seem...</div> : null}
          {day && !preGame ? <div>Talk amongst yourselves and try to figure out who is really a werewolf! Vote below and at the end of the day the one with the most votes will be killed.</div> : null}
          {!day ? <div>It is dangerous to walk these streets alone at night. Pray the werewolves don't find you!</div> : null}
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
        {!day && role === 'werewolf' ? <WerewolfChat werewolfMessages={werewolfMessages} handleWerewolfChat={handleWerewolfChat} /> : null}

      </div>
    </>
  )
}
export default GameView;