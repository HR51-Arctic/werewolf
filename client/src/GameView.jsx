import React, { useState, useEffect } from "react";
import Voting from "./Voting.jsx";
import WerewolfChat from "./WerewolfChat.jsx";
import villageDay from "./images/villageDay.jpg";
import villageNight from "./images/villageNight.jpg";
import EndGameModal from "./EndGame.jsx";
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouseClick.mp3';
import howl from '../../assets/sounds/howl.mp3';
import rooster from '../../assets/sounds/rooster.mp3';
import Sunrise from './Sunrise.jsx';
import Moonrise from './Moonrise.jsx';
import { IoIosVolumeHigh,  IoIosVolumeOff} from "react-icons/io";
import villager from './images/villager.png';
import werewolf from './images/werewolf.png';
import doctor from './images/doctor.jpg';
import seer from './images/seer.jpeg';

const GameView = ({
  myId,
  gameState,
  timer,
  day,
  vote,
  docChoice,
  endGame,
  preGame,
  werewolves,
  villagers,
  werewolfMessages,
  handleWerewolfChat,
  handleResetGame,
  voiceUrl,
  gameSettings
}) => {
  const [message, setMessage] = useState("");
  const [voting, setVoting] = useState(false);
  const [status, setStatus] = useState(false);
  const [sounds, setSounds] = useState(false);
  const [clickSound] = useSound(mouseClick, {volume: 0.5});
  // const [playHowl] = useSound(howl, {volume: 0.25, interrupt: true});
  // const [playRooster] = useSound(rooster, {volume: 0.25, interrupt: true});
  const image = {
    villager: villager,
    doctor: doctor,
    seer: seer,
    werewolf: werewolf,
  }

  let role;
  let alive;
  gameState.players.forEach((player) => {
    if (player.id === myId) {
      role = player.role;
      alive = player.alive;
    }
  });

  let myClass;

  // const [play, setPlay] = useState(false);
  // let howler = new Audio(howl);

  // useEffect(() => {
  //   if (day && sounds) {
  //     howler.play();
  //     setPlay(false)
  //   }
  // })

  return (

    <div id="gameView"  style={{
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundImage: day
        ? `url(${require("./images/villageDay.jpg")})`
        : `url(${require("./images/villageNight.jpg")})`
    }}>

    {sounds ?
      <IoIosVolumeHigh
      style={{height: '25px', width: '25px', borderRadius: '50%', backgroundColor: 'white'}}
      onClick={() => setSounds(!sounds)}
      />
    :
      <IoIosVolumeOff
      style={{height: '25px', width: '25px', borderRadius: '50%', backgroundColor: 'white'}}
      onClick={() => setSounds(!sounds)}
      />
    }

      {day ?
      <Sunrise />
      :
      <Moonrise timer={gameSettings.nightTimer}/>
      }

      <div id="role-container">
        <div id="role">
          <img id="roleImg" src={image[role]} />
          <h1 id="roleName" >You are a {role}</h1>
        </div>
        {/* <h1 id="role">You are a {role}</h1> */}
        <div id="timer">Time left: {timer} </div>
        <div id="voiceSetting">
          <a
            id="voiceUrl"
            href={voiceUrl.slice(0, 4) === 'http' ? voiceUrl : '//' + voiceUrl}
            target="_blank"
          >
            Join the Call!
          </a>
        </div>
      </div>

    <div id="info-container">
      <div id="messages-container">
      {status ?
              <div id="modal">
              {gameState.players.map((player) => {
                return (
                  <div key={player.id} id="status">{player.name} is {player.alive ? "Alive" : "Dead"}</div>
                )
              })}
            </div>
      : null}
        <div id = "gameMessage">
          {endGame ? (
            <EndGameModal endGame={endGame} clickHandler={handleResetGame} />
          ) : null}
          {preGame ? (
            <div>
              Welcome to werewolf! This is a small and tight-knit town, so
              introduce yourselves and get to know each other! But be careful,
              some may not be what they seem...
            </div>
          ) : null}
          {day && !preGame ? (
            <div>
              Talk amongst yourselves and try to figure out who is really a
              werewolf! Vote below and at the end of the day the one with the
              most votes will be killed.
            </div>
          ) : null}
          {!day ? (
            <div>
              It is dangerous to walk these streets alone at night. Pray the
              werewolves don't find you!
            </div>
          ) : null}
        </div>
        <div id="remaining">
          <div id="remWolves" >Remaining Werewolves: {werewolves}</div>
          <div id="remVillagers" >Remaining Villagers: {villagers}</div>
        </div>
        <div id="aliveDeadList">

          {!status ?
          <button id="currentPlayers"
          type='submit'
          value='Submit'
          onClick={() => clickSound() + setStatus(!status)}
          >Current Players</button> :
          <button id="close"
          type='submit'
          value='Submit'
          onClick={() => clickSound() + setStatus(!status)}
          >close</button>
          }

        {/* This is a dropdown instead, cant style options easily... */}
        {/* <div id="aliveDeadTitle">Current players</div> */}
        {/* <label style={{color: 'white'}}>
          Current Players:
        <select id="dropdown">
        {gameState.players.map((player) => {
          return (
            <option key={player.id} id="option">
              {player.name} is {player.alive ? "Alive" : "Dead"}
            </option>
          );
        })}
        </select>
        </label> */}

      </div>
      </div>

      <Voting
        gameState={gameState}
        day={day}
        myId={myId}
        vote={vote}
        docChoice={docChoice}
        preGame={preGame}
        role={role}
      />
      {!day && role === "werewolf" && alive ? (
        <WerewolfChat
          werewolfMessages={werewolfMessages}
          handleWerewolfChat={handleWerewolfChat}
        />
      ) : null}
     </div>

    </div>
  );
};
export default GameView;