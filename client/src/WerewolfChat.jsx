import React, { useState, useEffect } from 'react';



const WerewolfChat = ({ werewolfMessages, handleWerewolfChat }) => {
  const [message, setMessage] = useState('');

  const handleMessage = (event) => {
    setMessage(event.target.value);
  }

  return (
    <>
      <div className='werewolfChat'>
        {werewolfMessages.map((message) => {
          return <p>{message}</p>
        })}
      </div>
      <form onSubmit={(event) => {
        console.log(event)
        event.preventDefault();
        handleWerewolfChat(message);
        setMessage('')
      }} >
        <input onChange={handleMessage.bind(this)} value={message} />
        <button type="submit">Submit Message</button>
      </form>
    </>
  )
}

export default WerewolfChat;