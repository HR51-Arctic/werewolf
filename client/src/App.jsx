import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Login from './Login.jsx';
import Lobby from "./Lobby.jsx";
import GameView from "./GameView.jsx";
const ENDPOINT = "http://localhost:3000";

function App() {
  const [connection, setConnection] = useState({});
  const [message, setMessage] = useState('');
  const [gameState, setGameState] = useState('');
  const [lobbyParticipants, setLobbyParticipants] = useState([]);
  const [play, setPlay] = useState(false);
  const [myId, setMyId] = useState('');
  const [timer, setTimer] = useState('');
  const [day, setDay] = useState(true);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    setConnection(socket);
    //  + console.log(dirtySock);
    // console.log(dirtySock)
    socket.on("myId", (id) => {
      setMyId(id);
    });

    socket.on("GetParticipants", (data) => {
      setLobbyParticipants(data);
      console.log(lobbyParticipants)
    });

    socket.on("PreGame", (gameState) => {
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
    connection.emit('StartGame');
  }
  const handleLogin = (username, password) => {
    connection.emit('Login', username, password);
  }
  const handleSignup = (username, password, email) => {
    connection.emit('Signup', username, password, email);
  };
  // const handleAnonymous = (name) => {
  //   connection.emit('AnonymousLogin', name);
  // };
  const werewolfVote = (data) => {
    let wolfVote = {
      me: myId,
      vote: data
    }
    connection.emit('werewolfVote', wolfVote);
  }

  if (play) {
    return <GameView myId={myId} gameState={gameState} timer={timer} day={day} werewolfVote={werewolfVote.bind(this)} />
  }

  return (
    <div>
      <Login
        handleLogin={handleLogin.bind(this)}
        handleSignup={handleSignup.bind(this)}
      />
      <Lobby
        participants={lobbyParticipants}
        handleGameStart={handleGameStart.bind(this)}
      />
    </div>
  );
}

export default App;
