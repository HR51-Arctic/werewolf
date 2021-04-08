import React, { useState } from "react";
import GameView from "./GameView.jsx";
import AppHeader from "./AppHeader.jsx";

const Lobby = ({ participants, handleGameStart, loggedIn }) => {
  const [message, setMessage] = useState("");
  return (
    <>
      <div id="frontPage">
        <AppHeader id="header" />
        <div id="lobby">
          <div id="players">
            <h4 id="playerHeader">Players</h4>
            {participants.map((player) => {
              return (
                <div id="indivPlayer" key={player.id}>
                  {player.name}
                </div>
              );
            })}
          </div>
          {participants.length >= 7 && loggedIn && (
            <button
              className="playButton"
              type="submit"
              value="Submit"
              onClick={() => handleGameStart()}
            >
              Play
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Lobby;
