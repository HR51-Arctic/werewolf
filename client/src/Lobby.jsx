import React, { useState } from 'react'
import GameView from './GameView.jsx';


const Lobby = ({ participants, handleGameStart }) => {

  const [message, setMessage] = useState('');
  const [play, setPlay] = useState(false);

  if (play) {
    return <GameView />;
  } else {
  return (
    <>
      <div>
        <div style={{height: '250px', width: '50%', border: '3px solid black'}}>
          <span>Username and stats</span>
        </div>
        <div style={{height: '150px', width: '100px', border: '3px solid black'}}>
          {participants.map((player) => {
            return (
              <div key={player}>{player}</div>
            )
          })}
        </div>
        <div>
          <div style={{height: '100px', width: '50%', border: '3px solid black'}}>
            <textarea
            name='chat'
            type='text'
            value={message}
            onChange={e => setMessage(e.target.value)}
            >Message</textarea>
          </div>
          <button
          type='submit'
          value='Submit'
          onClick={() => console.log('Posted message')}
          >Post Message</button>
        </div>
      </div>
      <button
      type='submit'
      value='Submit'
      onClick={() => handleGameStart()}
      >PLAY</button>
    </>
  )
  }
}

export default Lobby;