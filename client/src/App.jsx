import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Lobby from './Lobby.jsx';
import GameView from './GameView.jsx';
const ENDPOINT = 'http://localhost:3000';

function App() {
  const [dirtySock, setDirtySock] = useState({});
  const [message, setMessage] = useState('');
  const [gameState, setGameState] = useState('');
  const [lobbyParticipants, setLobbyParticipants] = useState([]);
  const [play, setPlay] = useState(false);
  const [myId, setMyId] = useState('');
  const [timer, setTimer] = useState('');
  const [day, setDay] = useState(true);


  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    setDirtySock(socket);
    //  + console.log(dirtySock);
    // console.log(dirtySock)
    socket.on('myId', (id) => {
      setMyId(id);
    });

    socket.on('GetParticipants', (data) => {
      setLobbyParticipants(data);
    });


    socket.on('PreGame', (gameState) => {
      setGameState(gameState);
      setPlay(true);

    })

    socket.on('timer', (timer) => {
      setTimer(timer);
    })

    socket.on('changePhase', (gamePhase) => {
      setDay(gamePhase.day)
    })

  }, []);

  const handleGameStart = () => {
    dirtySock.emit('StartGame');
  }
  if (play) {
    return <GameView myId={myId} gameState={gameState} timer={timer} day={day} />
  }

  return (
    <div>
      <Lobby participants={lobbyParticipants} handleGameStart={handleGameStart.bind(this)} />
    </div>


  );
}

export default App;
