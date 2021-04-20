import React, { useState } from "react";
import SeerVote from "./SeerVote.jsx";
import DocVote from "./DocVote.jsx";
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouseClick.mp3';


const Voting = ({ gameState, day, myId, vote, docChoice, role, preGame }) => {
// comment
  const [choice, setChoice] = useState('');
  const [clickSound] = useSound(mouseClick, {volume: 0.5});

  let voting = false;
  let myPlayer = null;
  if (gameState.players.length > 1) { //remove if check
    for (let x = 0; x < gameState.players.length; x++) {
      let player = gameState.players[x];
      if (myId === player.id) {
        myPlayer = player;
        break;
      }
    }
    if (myPlayer.alive && day) {
      voting = true;
    } else if (!day && myPlayer.role === "werewolf" && myPlayer.alive) {
      voting = true;
    }
    else if (myPlayer.role === 'werewolf' && !day && myPlayer.alive) {
      voting = true;
    }
    if (preGame) {
      return null;
    }
  } else {
    voting = true
  }

  if (voting) {
    return (
      <div id="voting">

        {role === "werewolf" && !day ? <h3 style={{textAlign: 'center', color: 'white'}}>Choose your victim!</h3> : null}
        {day ? <h3 style={{textAlign: 'center', color: 'white'}}>Kill the Werewolves!</h3> : null}
         {gameState.players.map((player) => {
          if (day) {
            if (player.id !== myId && player.alive) {
              return (
                <div
                  id="wolfVoting"
                  key={player.id}
                  onClick={() => vote(player.id) + clickSound()}
                >
                  {player.name}
                  <br />
                  Votes: {player.targeted}
                </div>
              );
            }
          } else {
            if (
              player.id !== myId &&
              player.role !== "werewolf" &&
              player.alive
            ) {
              return (
                <div
                  id="villagerVoting"
                  key={player.id}
                  onClick={() => vote(player.id) + clickSound()}
                >
                  {player.name}
                  <br />
                  Votes: {player.targeted}
                </div>
              );
            }
          }
        })}

      </div>
    );
  }
  if (!myPlayer.alive) {
    return <h1 style={{color: 'white'}}>YOU ARE DEAD</h1>;
  }
  if (myPlayer.role === "doctor") {
    return <DocVote docChoice={docChoice} gameState={gameState} myId={myId} />;
  }
  if (myPlayer.role === "seer") {
    return <SeerVote gameState={gameState} myId={myId} />;
  }
  return <div id="warningMsg" ><h1 style={{color: 'white'}} >Beware! Werewolves are on the hunt!</h1></div>;
};

export default Voting;