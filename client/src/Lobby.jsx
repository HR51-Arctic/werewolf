import React, { useState } from "react";
import GameView from "./GameView.jsx";
import AppHeader from "./AppHeader.jsx";
import Login from "./Login.jsx";

const Lobby = ({
  participants,
  handleGameStart,
  handleLogin,
  handleSignup,
  loggedIn,
  gameSettings,
  onGameSettingsChange,
}) => {
  const [message, setMessage] = useState("");
  let settingsForm = (
    <form id="settingsView">
      {" "}
      <label>Timers:</label>
      <label>
        Pre-game:
        <input
          className="setting"
          name="preGameTimer"
          type="number"
          value={gameSettings.preGameTimer}
          onChange={onGameSettingsChange}
        />
      </label>
      <label>
        Day:
        <input
          className="setting"
          name="dayTimer"
          type="number"
          value={gameSettings.dayTimer}
          onChange={onGameSettingsChange}
        />
      </label>
      <label>
        Night:
        <input
          className="setting"
          name="nightTimer"
          type="number"
          value={gameSettings.nightTimer}
          onChange={onGameSettingsChange}
        />
      </label>
    </form>
  );
  return (
    <>
      <div id="frontPage">
        <AppHeader id="header" />
        <div id="lobby">
          <Login
            loggedIn={loggedIn}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
          />
          <div id="players">
            <h4 id="playerHeader">Players</h4>
            {settingsForm}
            <ul>
              {participants.map((player) => {
                return (
                  <li id="indivPlayer" key={player.id}>
                    {player.name}
                  </li>
                );
              })}
            </ul>
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
