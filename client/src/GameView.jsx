import React, { useState, useEffect } from 'react';
import Voting from './Voting.jsx';
import WerewolfChat from './WerewolfChat.jsx';
import villageDay from './images/villageDay.jpg';
import villageNight from './images/villageNight.jpg';


const GameView = ({ myId, gameState, timer, day, vote, docChoice, endGame, preGame, werewolves, villagers, werewolfMessages, handleWerewolfChat, handleResetGame }) => {

  const [message, setMessage] = useState('');
  const [voting, setVoting] = useState(false);


  let role;
  gameState.players.forEach((player) => {
    if (player.id === myId) {
      role = player.role;
    }
  });


  return (
    < >
      <div style={{ backgroundColor: 'grey' }}>
        <div id='gameView' >
          <div id="role-container">
            <h1 id='role'>You are a {role}</h1>
            <div id='timer'>Time left: {timer} </div>
          </div>

          <div id='gameMessage'>

            {endGame ? <h1>{endGame}<button onClick={handleResetGame}>EndGame</button></h1> : null}
            {preGame ? <div>Welcome to werewolf! This is a small and tight-knit town, so introduce yourselves and get to know each other! But be careful, some may not be what they seem...</div> : null}
            {day && !preGame ? <div>Talk amongst yourselves and try to figure out who is really a werewolf! Vote below and at the end of the day the one with the most votes will be killed.</div> : null}
            {!day ? <div>It is dangerous to walk these streets alone at night. Pray the werewolves don't find you!</div> : null}

          </div>

          <div id='villageImage' style={{
            backgroundImage: day ? `url(${require('./images/villageDay.jpg')})`
              : `url(${require('./images/villageNight.jpg')})`
          }} />
          <div id='aliveDeadList'>
            <div id='aliveDeadTitle'>Current players</div>
            {gameState.players.map((player) => {
              return (
                <div key={player.id} className="aliveDeadEntry" >{player.name} is {player.alive ? 'Alive' : 'Dead'}</div>
              )
            })}
          </div>
          <div id='remaining'>
            <h2 id='playersRemaining'>Players Remaining</h2>
            <div>Remaining Werewolves: {werewolves}</div>
            <div>Remaining Villagers: {villagers}</div>
          </div>
          <div id='voting'>
            <Voting gameState={gameState} day={day} myId={myId} vote={vote} docChoice={docChoice} preGame={preGame} role={role} />
          </div>
          {!day && role === 'werewolf' ? <WerewolfChat werewolfMessages={werewolfMessages} handleWerewolfChat={handleWerewolfChat} /> : null}
        </div>
      </div>
    </>
  )
}
export default GameView;