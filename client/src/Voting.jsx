import React, {useState} from 'react';
import Werewolf from './Characters/Werewolf.jsx';
import Seer from './Characters/Seer.jsx';
import Villager from './Characters/Villager.jsx';
import Doctor from './Characters/Doctor.jsx';

const handleVote = (gameState, day, id) => {
  if (gameState.players[id].role === 'werewolf' && !day) {
    return (
      <Werewolf />
    )
  } else if (gameState.players[id].role === 'doctor' ) {
    return (
      <Doctor />
    )
  } else if (gameState.players[id].role === 'seer') {
    return <Seer />
  } else {
    return <Villager />
  }
}

const Voting = ({ gameState, day, myId, vote, docChoice, role }) => {
  // const [voting, setVoting] = useState(false);
  let voting = false
  let myPlayer = null
  for (let x = 0; x < gameState.players.length; x++) {
    let player = gameState.players[x]
    if (myId === player.id) {
      myPlayer = player
      break
    }
  }
  if (myPlayer.alive && day) {
    voting = true
  } else if (!day && myPlayer.role === 'werewolf' && myPlayer.alive) {
    voting = true
  }
  // else if (myPlayer.role === 'werewolf' && !day && myPlayer.alive) {
  //   setVoting(true)
  // }
  if (voting) {
    return(
      <div>
        {gameState.players.map((player) => {
          if (day) {
            if (player.id !== myId && player.alive) {
              return <button onClick={() => {vote(player.id)}}>{player.name}</button>
            }
          } else {
            if (player.id !== myId && player.role !== 'werewolf' && player.alive) {
              return <button onClick={() => {vote(player.id)}}>{player.name}</button>
            }
          }
        }) }
      </div>
    )
  }
  if (!myPlayer.alive) {
    return <div>You are dead</div>
  }
  return <div>You cannot vote during the night</div>
}

export default Voting;


{/* //if not voting present this
<div>
  <select>
  <option value='Lynch'>Lynch</option>
  <option value='Save'>Save</option>
  <option value='See'>See</option>
  </select>
  <button type='submit' value='Submit'>Submit</button>
</div> */}

