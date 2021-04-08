import React, { useState, useEffect } from 'react';



const WerewolfChat = ({ werewolfMessages, handleWerewolfChat }) => {
  const [message, setMessage] = useState('');

  const handleMessage = (event) => {
    setMessage(event.target.value);
  }

  return (
    <div id="werewolfChat">
      <div className='werewolfChat'>
        {werewolfMessages.map((message) => {
          return <p>{message}</p>
        })}
      </div>
      <form onSubmit={(event) => {
        event.preventDefault();
        handleWerewolfChat(message);
        setMessage('')
      }} >
        <input onChange={handleMessage.bind(this)} value={message} />
        <input type="submit" value="Submit Message"/>
      </form>
    </div>
  )
}

export default WerewolfChat;