import React, { useState, useEffect } from "react";
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouseClick.mp3';


const WerewolfChat = ({ werewolfMessages, handleWerewolfChat }) => {

  const [message, setMessage] = useState("");
  const [clickSound] = useSound(mouseClick, {volume: 0.5});

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div id="werewolfChat">
      <span id="werewolfChatHeading">
        Strategize with other werewolves here:
      </span>
      <form id="wolfForm"
        onSubmit={(event) => {
          event.preventDefault();
          handleWerewolfChat(message);
          setMessage("");
        }}
      >
        <input onChange={handleMessage.bind(this)} value={message} />
        <input type="submit" value="Message" onClick={() => clickSound()}/>
      </form>
      <div id="wolfMsgContainer">
        {werewolfMessages.map((message, index, array) => {
          return (
            <p key={index}>
              {array[array.length - 1 - index][0]}:{" "}
              {array[array.length - 1 - index][1]}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default WerewolfChat;