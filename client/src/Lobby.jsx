import React, { useState } from "react";
import GameView from "./GameView.jsx";
import AppHeader from "./AppHeader.jsx";

const Lobby = ({ participants, handleGameStart, loggedIn, gameSettings, onGameSettingsChange }) => {
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
          <form>
            <label>
              Pre-game Timer Length
            <input
              name="preGameTimer"
              type="number"
              value={gameSettings.preGameTimer}
              onChange={onGameSettingsChange}
            />
            </label>
            <label>
              Day Timer Length
            <input
              name="dayTimer"
              type="number"
              value={gameSettings.dayTimer}
              onChange={onGameSettingsChange}
            />
            </label>
            <label>
              Night Timer Length
            <input
              name="nightTimer"
              type="number"
              value={gameSettings.nightTimer}
              onChange={onGameSettingsChange}
            />
            </label>
          </form>
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
