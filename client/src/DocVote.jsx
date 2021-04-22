import React, { useState } from 'react';
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouseClick.mp3';


const DocVote = ({ gameState, myId, docChoice }) => {

  const [save, setSave] = useState(false);
  const [viewRole, setViewRole] = useState('');
  const [clickSound] = useSound(mouseClick, {volume: 0.5});

  const protect = (id) => {
    for (let i = 0; i < gameState.players.length; i++) {
      if (gameState.players[i].id === id) {
        // setViewRole(gameState.players[i]); for dropdown
        docChoice(id);
      }
    }
  };

  // For the dropdown menu
  // const handleChange = (event) => {
  //   setViewRole(event.name);
  //   protect(event.value);
  // };

  if (!save) {
    return (

      <div id="doctorContainer">
      <h3 style={{color: 'white'}}>Choose who to protect</h3>
      {gameState.players.map((player) => {
        if (player.alive && player.id !== myId) {
          return (
            <div
            id="docAction"
            key={player.id}
            onClick={() => clickSound() + setViewRole(player) + setSave(true) + protect(player.id)}
            >
            {player.name}
            </div>
          )
        }
      })}
    </div>

    // Dropdown menu just in case...
    //   <>
    //   <div id="doctorContainer">
    //     <h4 style={{color: 'white'}}>Choose who to protect</h4>
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
    //       onClick={() => (viewRole ? setSave(true) : null)}
    //       >Submit</button>
    //     </div>
    // </div>
    // </>
    )
  } else {
    return (
      <div id='doctorContainer'>
        <h4 style={{color: 'white'}}>You have protected: {viewRole.name}</h4>
      </div>
    )
  }
};


export default DocVote;