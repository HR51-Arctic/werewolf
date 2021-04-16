import React, { useState } from 'react';

const SeerVote = ({ gameState, myId }) => {

  const [revealed, setRevealed] = useState(false);
  const [viewRole, setViewRole] = useState('');


  const see = (id) => {
    for (let i = 0; i < gameState.players.length; i++) {
      if (gameState.players[i].id === id) {
        setViewRole(gameState.players[i]);
      }
    }
  };

  const handleChange = (event) => {
    setViewRole(event.name);
    see(event.value);
  }

  if (!revealed) {
    return (
      <>
      <div id="seerContainer">
        <h4 style={{color: 'white'}}>Whos role do you want see?</h4>
        <div>
          <form>
            <select onChange={(e) => handleChange(e.target)}>
              {gameState.players.map((player) => {
                if (player.alive && player.id !== myId) {
                  return (
                    <option
                    name={player.name}
                    key={player.id}
                    value={player.id}
                    >
                    {player.name}
                    </option>
                  )
                }
              })}
            </select>
          </form>
          <button
          type='submit'
          value='Submit'
          onClick={() => (viewRole ? setRevealed(true) : null)}
          >Submit</button>
        </div>
    </div>
    </>
    )
  } else {
    return (
      <div id='seerContainer'>
        <h4 style={{color: 'white'}}>{viewRole.name} is a {viewRole.role}</h4>
      </div>
    )
  }
};

// class SeerVote extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       revealed: false,
//     };
//     this.reveal = this.reveal.bind(this);
//   }

//   reveal(id) {
//     let { gameState } = this.props;
//     for (let x = 0; x < gameState.players.length; x++) {
//       let player = gameState.players[x];
//       if (player.id === id) {
//         this.setState({
//           revealed: player,
//         });
//         return;
//       }
//     }
//   }

//   render() {
//     let { gameState, myId } = this.props;
//     const { revealed } = this.state;
//     if (!revealed) {
//       return (
//         <div id="seerContainer">
//           <h4>Who do you want to SEEEE</h4>
//           <div>
//             {gameState.players.map((player) => {
//               if (player.alive && player.id !== myId) {
//                 return (
//                   <button onClick={() => this.reveal(player.id)}>
//                     {player.name}
//                   </button>
//                 );
//               }
//             })}
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <h4>
//           {revealed.name} is a {revealed.role}
//         </h4>
//       );
//     }
//   }
// }

export default SeerVote;
