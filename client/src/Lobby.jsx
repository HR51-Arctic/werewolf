import React, { useState } from 'react'

const Lobby = () => {

  const [message, setMessage] = useState('');

  return (
    <>
      <div>
        <div style={{height: '250px', width: '50%', border: '3px solid black'}}>
          <span>Username and stats</span>
        </div>
        <div style={{height: '150px', width: '100px', border: '3px solid black'}}>
          <span>Player1</span>
        </div>
        <div>
          <div style={{height: '100px', width: '50%', border: '3px solid black'}}>
            <textarea
            name='chat'
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
      onClick={() => console.log('Starting Game')}
      >PLAY</button>
    </>
  )
}

export default Lobby;