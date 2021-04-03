import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Lobby from './Lobby.jsx';
const ENDPOINT = 'http://localhost:3000';

function App() {
  const [response, setResponse] = useState('');
  const [message, setMessage] = useState('');
  const [gameState, setGameState] = useState('');
  const [lobbyParticipants, setLobbyParticipants] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });

    socket.on('GetParticipants', (data) => {
      setLobbyParticipants(data);
    });

    socket.on('updateGame', (data) => {
      console.log(data)
      setGameState(data);
    })

  }, []);

  return (
    <div>
      <Lobby participants={lobbyParticipants} />
    </div>


  );
}

// import React from 'react'

// class App extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {}

//   }

//   render() {
//     return(
//       <div>React good to go</div>
//     )
//   }
// }



export default App;
