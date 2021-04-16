import React, { useState } from 'react';
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouseClick.mp3';


const SeerVote = ({ gameState, myId }) => {

  const [revealed, setRevealed] = useState(false);
  const [viewRole, setViewRole] = useState('');
  const [clickSound] = useSound(mouseClick, {volume: 0.5});

  // For the dropdown menu
  // const see = (id) => {
  //   for (let i = 0; i < gameState.players.length; i++) {
  //     if (gameState.players[i].id === id) {
  //       setViewRole(gameState.players[i]);
  //     }
  //   }
  // };

  // const handleChange = (event) => {
  //   setViewRole(event.name);
  //   see(event.value);
  // }

  if (!revealed) {
    return (
      <div id="seerContainer">
        <h3 style={{color: 'white'}}>Whos role do you want to see?</h3>
        {gameState.players.map((player) => {
          if (player.alive && player.id !== myId) {
            return (
              <div
              id="seerAction"
              key={player.id}
              onClick={() => clickSound() + setViewRole(player) + setRevealed(true)}
              >
              {player.name}
              </div>
            )
          }
        })}
      </div>


    //  Dropdown menu just in case? ...
    //   <>
    //   <div id="seerContainer">
    //     <h4 style={{color: 'white'}}>Whos role do you want see?</h4>
    //     <div>
    //       <form>
    //         <select onChange={(e) => handleChange(e.target)}>
    //           {gameState.players.map((player) => {
    //             if (player.alive && player.id !== myId) {
    //               return (
    //                 <option
    //                 name={player.name}
    //                 key={player.id}
    //                 value={player.id}
    //                 >
    //                 {player.name}
    //                 </option>
    //               )
    //             }
    //           })}
    //         </select>
    //       </form>
    //       <button
    //       type='submit'
    //       value='Submit'
    //       onClick={() => (viewRole ? setRevealed(true) : null)}
    //       >Submit</button>
    //     </div>
    // </div>
    // </>

    )
  } else {
    return (
      <div id='seerContainer'>
        <h4 style={{color: 'white'}}>{viewRole.name} is a {viewRole.role}</h4>
      </div>
    )
  }
};


export default SeerVote;
