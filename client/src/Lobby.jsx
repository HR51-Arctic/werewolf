import React, { useState } from "react";
import GameView from "./GameView.jsx";
import AppHeader from "./AppHeader.jsx";
import Login from "./Login.jsx"

const Lobby = ({ participants, handleGameStart, handleLogin, handleSignup, loggedIn }) => {
  const [message, setMessage] = useState("");
  return (
    <>
      <div id='frontPage'>
        <AppHeader id="header" />
        <div id="lobby">
           <Login loggedIn={loggedIn} handleLogin={handleLogin} handleSignup={handleSignup}/>
          <div id="players">
            <h4 id="playerHeader">Players</h4>
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
          {(participants.length >= 7 && loggedIn) && (
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
