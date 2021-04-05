import React, { useState } from 'react';

const GameView = ({ myId, gameState, timer, day }) => {

  const [message, setMessage] = useState('');
  // timer will start/end voting???
  const [voting, setVoting] = useState(false);
  const [votes, setVote] = useState(0);
  // # of werewolves dependant on # players???
  const [wolves, setWolves] = useState(2);
  // Just for testings sake
  // const [day, setDay] = useState(true);


  let role;
  gameState.players.forEach((player) => {
    if (player.id === myId) {
      role = player.role;
    }
  })

  const Voting = () => {
    if (!voting) {
      return null;
    } else {
      return (
        <div id="voting">
          <span>Player <a>Votes {votes}</a></span>
          <button
            type='submit'
            value='Submit'
            onClick={() => setVote(votes + 1) + setVoting(false)}
          >Vote</button>
        </div>
      )
    }
  };

  return (
    <>
      <div id="background" style={{ backgroundColor: day ? 'yellow' : 'grey' }}>
        <button
          type='submit'
          value='Submit'
          onClick={() => setDay(day ? false : true)}
        >Change Phase</button>
        <div id="turn-info" style={{ height: '250px', width: '50%', border: '3px solid black' }}>
          <p>Username</p>
          <p>You are a {role}</p>
          <p>Current turn</p>
          <span>Discussion Timer</span>
        </div>
        <div id="role-continaer" style={{ height: '100px', width: '50%', border: '3px solid black' }}>
          <h1>You are a {role}</h1>
          <div>Time left: {timer} </div>
        </div>
        <span id="remaining-wolves">Remaining Werewolves {wolves}</span>
        <div id="status-container" style={{ height: '250px', width: '50%', border: '3px solid black' }}>
          <span>Username, icon, message</span>
          <span>Username, icon, message</span>
          <br />
          <textarea id="game-chat"
            name='gameChat'
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
          <button type='submit' value='Submit'>Post</button>
        </div>
        {voting ? <Voting /> :
          <div id="selection">
            <select>
              <option value='Lynch'>Lynch</option>
              <option value='Save'>Save</option>
              <option value='See'>See</option>
            </select>
            <button type='submit' value='Submit'>Submit</button>
          </div>}
        <button
          type='submit'
          value='Submit'
          onClick={() => setVoting(true)}
        >Pretend Timer</button>
      </div>
    </>
  )
}
export default GameView;