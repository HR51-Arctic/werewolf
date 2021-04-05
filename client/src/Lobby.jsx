import React, { useState } from "react";
import GameView from "./GameView.jsx";
import AppHeader from "./AppHeader.jsx";

const Lobby = ({ participants, handleGameStart }) => {
  const [message, setMessage] = useState("");

  return (
    <>
      <div id="lobby">
        <AppHeader id="header" />
        <div>
          <div>
            <div>Username and stats</div>
          </div>
          <div id="players">
            {participants.map((player) => {
              return <div key={player}>{player}</div>;
            })}
          </div>
          <div>
            <div id="lobby-chat">
              <form>
                <input
                  name="chat"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></input>
              </form>
            </div>
            <button
              type="submit"
              value="Submit"
              onClick={() => console.log("Posted message")}
            >
              Post Message
            </button>
          </div>
        </div>
        <button type="submit" value="Submit" onClick={() => handleGameStart()}>
          PLAY
        </button>
      </div>
    </>
  );
};

export default Lobby;
