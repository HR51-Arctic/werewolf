import React, { useState, useEffect } from "react";

const WerewolfChat = ({ werewolfMessages, handleWerewolfChat }) => {
  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div id="werewolfChat">
      <h3>
        Strategize with other werewolves here:
      </h3>
      <div className="message-list">
        {werewolfMessages.map((message, index, array) => {
          return (
            <p>
              <span style={{fontWeight: 'bold'}}>
                {array[array.length - 1 - index][0]}:{" "}
              </span>
              {array[array.length - 1 - index][1]}
            </p>
          );
        })}
      </div>
      {/* <form
        onSubmit={(event) => {
          event.preventDefault();
          handleWerewolfChat(message);
          setMessage("");
        }}
      > */}
        <div className="message">
          <input className='message-input' onChange={handleMessage.bind(this)} value={message} />
          <input
            className='message-button'
            type="submit"
            value="Message"
            onClick={(event) => {
              event.preventDefault();
              handleWerewolfChat(message);
              setMessage("");
            }}
          />
        </div>
      {/* </form> */}
    </div>
  );
};

export default WerewolfChat;
