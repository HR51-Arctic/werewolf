import React, { useState } from "react";
import GameView from "./GameView.jsx";
import AppHeader from "./AppHeader.jsx";
import Login from "./Login.jsx";
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouseClick.mp3';
import ParallaxEyes from './ParallaxEyes.jsx'
import { motion, useMotionValue, useTransform } from 'framer-motion';
import wolfEyes from './images/wolfEyes.jpeg';
// import Eyes from './images/eyes.png';

const Lobby = ({ participants, handleGameStart, handleLogin, handleSignup, loggedIn, gameSettings, onGameSettingsChange }) => {

  const [message, setMessage] = useState("");
  const [clickSound] = useSound(mouseClick, {volume: 0.5});

  let settingsForm = (
    <form id="settingsView">
      <label>Timers:</label>
      <label>
        Pregame:
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
      <label>
        Voice URL:
        <input
          className="urlsetting"
          name="voiceUrl"
          type="url"
          value={gameSettings.voiceUrl}
          onChange={onGameSettingsChange}
        />
      </label>
    </form>
  );

  // Parallax Eyes
  const x = useMotionValue(200);
  const y = useMotionValue(200);
  const rotateX = useTransform(y, [0, 400], [45, -45]);
  const rotateY = useTransform(x, [0, 400], [-45, 45]);

  const handleMouse = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <>
      <div id="frontPage" onMouseMove={handleMouse}>
        {/* <ParallaxEyes /> */}
        <motion.div
        style={{
            width: 150,
            height: 150,
            rotateX: rotateX,
            rotateY: rotateY,
        }}
    >
      <img src={wolfEyes}  style={{width: 150, height: 150}}/>
    </motion.div>
        <AppHeader id="header" />
        <div id="lobby">
          <Login
            loggedIn={loggedIn}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            participants={participants}
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
          {participants.length >= 1 && loggedIn && ( //change back to 1 post testing
            <button
              className="playButton"
              type="submit"
              value="Submit"
              onClick={() => handleGameStart() + clickSound()}
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
