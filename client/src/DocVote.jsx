import React, { useState } from 'react';


const DocVote = ({ gameState, myId, docChoice }) => {

  const [save, setSave] = useState(false);
  const [viewRole, setViewRole] = useState('');


  const protect = (id) => {
    for (let i = 0; i < gameState.players.length; i++) {
      if (gameState.players[i].id === id) {
        setViewRole(gameState.players[i]);
        docChoice(id);
      }
    }
  };

  const handleChange = (event) => {
    setViewRole(event.name);
    protect(event.value);
  };

  if (!save) {
    return (
      <>
      <div id="doctorContainer">
        <h4 style={{color: 'white'}}>Choose who to protect</h4>
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
          onClick={() => (viewRole ? setSave(true) : null)}
          >Submit</button>
        </div>
    </div>
    </>
    )
  } else {
    return (
      <div id='doctorContainer'>
        <h4 style={{color: 'white'}}>You have protected: {viewRole.name}</h4>
      </div>
    )
  }
};

// class DocVote extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       protect: false,
//     };
//     this.protect = this.protect.bind(this);
//   }

//   protect(player) {
//     this.setState({ protect: player.name });
//     this.props.docChoice(player.id);
//   }

//   render() {
//     const { gameState, docChoice, myId } = this.props;
//     if (!this.state.protect) {
//       return (
//         <div id="doctorContainer" >
//           <h3>Choose who to protect</h3>
//           <div>
//             {gameState.players.map((player) => {
//               if (player.alive && player.id !== myId) {
//                 return (
//                   <button
//                     onClick={() => {
//                       this.protect(player);
//                     }}
//                   >
//                     {player.name}
//                   </button>
//                 );
//               }
//             })}
//           </div>
//         </div>
//       );
//     } else {
//       return <h3>You have protected: {this.state.protect}</h3>;
//     }
//   }
// }

export default DocVote;
