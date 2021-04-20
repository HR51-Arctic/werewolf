import React, { useState } from "react";
import GameView from "./GameView.jsx";
import AppHeader from "./AppHeader.jsx";
import Login from "./Login.jsx";
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouseClick.mp3';
import growl from '../../assets/sounds/growl.mp3';
// import ParallaxEyes from './ParallaxEyes.jsx'
import { motion, useMotionValue, useTransform } from 'framer-motion';
import wolfEyes from './images/wolfEyes.jpeg';
// import Eyes from './images/eyes.png';

const Lobby = ({ participants, handleGameStart, handleLogin, handleSignup, loggedIn, gameSettings, onGameSettingsChange }) => {

  const [message, setMessage] = useState("");
  const [clickSound] = useSound(mouseClick, {volume: 0.5});
  const [play, { stop }] = useSound(growl, {volume: 0.5});
  const [hovering, setHovering] = useState(false);

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
  const x = useMotionValue(100);
  const y = useMotionValue(100);
  const rotateX = useTransform(y, [0, 200], [20, -20]);
  const rotateY = useTransform(x, [0, 200], [-20, 20]);

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
            boxShadow: '0px -20px 50px 50px black',
            borderRadius: '20%',
            rotateX: rotateX,
            rotateY: rotateY,
        }}
        onMouseEnter={() => setHovering(true) + play()}
        onMouseLeave={() => setHovering(false) + stop()}
        transition={{type: "spring", mass: 1, stiffness: 350, damping: 25, tension: 100}}
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