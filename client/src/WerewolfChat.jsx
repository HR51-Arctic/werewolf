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

      <div id="wolfMsgContainer">
        <form id="wolfForm"
        onSubmit={(event) => {
        event.preventDefault();
        handleWerewolfChat(message);
        setMessage("");
        }}
        >
        <input id="wolfMsgInput"
        placeholder="Enter a message"
        onChange={handleMessage.bind(this)}
        value={message}
        />
        <input type="submit" value="Message" onClick={() => clickSound()}/>
      </form>

        {werewolfMessages.map((message, index, array) => {
          return (
            <div key={index} style={{width: '80%', border: '2px solid black', marginLeft: '5%', marginRight: '5%', marginTop: '1%', marginBottom: '1%', backgroundColor: 'rgb(75, 3, 3)', overflow: 'auto'}}>
            <p key={index} id="wolfText">
              {array[array.length - 1 - index][0]}:{" "}
              {array[array.length - 1 - index][1]}
            </p>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default WerewolfChat;
