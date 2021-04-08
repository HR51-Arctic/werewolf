import React, { useState, useEffect } from 'react';



const WerewolfChat = ({ werewolfMessages, handleWerewolfChat }) => {
  const [message, setMessage] = useState('');

  const handleMessage = (event) => {
    setMessage(event.target.value);
  }

  return (
    <div id="werewolfChat">
      <form onSubmit={(event) => {
        event.preventDefault();
        handleWerewolfChat(message);
        setMessage('')
      }} >
        <input onChange={handleMessage.bind(this)} value={message} />
        <input type="submit" value="Submit Message"/>
      </form>
      <div className='werewolfChat'>
        {werewolfMessages.map((message, index, array) => {
          return <p>{array[array.length - 1 - index][0]}: {array[array.length - 1 - index][1]}</p>
        })}
      </div>
    </div>
  )
}

export default WerewolfChat;