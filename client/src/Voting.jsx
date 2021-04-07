import React, {useState} from 'react';
import SeerVote from './SeerVote.jsx';
import DocVote from './DocVote.jsx';

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
  if (myPlayer.role === 'doctor') {
    return <DocVote docChoice={docChoice} gameState={gameState}/>
  }
  if (myPlayer.role === 'seer') {
    return <SeerVote gameState={gameState}/>
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

