import React, { useState, useEffect } from "react";

const WerewolfChat = ({ werewolfMessages, handleWerewolfChat }) => {
  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div id="werewolfChat">
      <div id="werewolfChatHeading">
        Strategize with other werewolves here:
      </div>

      <div className="werewolfChat">
        <div className="message-list">
          {werewolfMessages.map((message, index, array) => {
            return (
              <p>
                {array[array.length - 1 - index][0]}:{" "}
                {array[array.length - 1 - index][1]}
              </p>
            );
          })}
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleWerewolfChat(message);
          setMessage("");
        }}
      >
        <div className="message">
          <input className='message-input' onChange={handleMessage.bind(this)} value={message} />
          <input className='message-button' type="submit" value="Message" />
        </div>
      </form>
    </div>
  );
};

export default WerewolfChat;
