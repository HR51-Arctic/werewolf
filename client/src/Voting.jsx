import React, {useState} from 'react'

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
  }
  // else if (myPlayer.role === 'werewolf' && !day && myPlayer.alive) {
  //   setVoting(true)
  // }

  return(
    <div>
      {gameState.players.map((player) => {
        if (player.id !== myId && player.alive) {
          return <button onClick={() => {vote(player.id)}}>{player.name}</button>
        }
      }) }
    </div>
  )
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

