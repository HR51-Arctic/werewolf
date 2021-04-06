const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const Game = require("./gameClass.js");
const Player = require("./playerClass.js");
const assignRoles = require("./assignRoles.js");

const port = process.env.PORT || 3000;
const index = require("./routes/index");

app.use(express.static("public"));
// app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const clients = [];

let currentGame;

io.on("connection", (socket) => {
  console.log("New client connected");
  clients.push(socket.id);
  // console.log(game);
  socket.emit("myId", socket.id);
  io.sockets.emit("GetParticipants", clients);

  socket.on("disconnect", () => {
    console.log("client disconnected");
    clients.splice(clients.indexOf(socket.id), 1);
    if (currentGame) {
      currentGame.removePlayer(socket.id);
    }
    io.sockets.emit("GetParticipants", clients);
  });
  ///////////////////////////////////////////////////////////////
  socket.on("StartGame", () => {
    // this is only available if clients.length >= 7
    if (!currentGame) {
      currentGame = new Game();
    }

    // var newGame = new Game(); ---> for futurue instancing for many game states. Right now single state for MVP
    // currentGame = newGame

    let playerPool = [];
    clients.forEach((client) => {
      var newPlayer = new Player(client);
      playerPool.push(newPlayer);
    });

    if (playerPool.length >= 7) {
      assignRoles(currentGame, playerPool);
      currentGame.active = true; //turning on the game --> game is in progress until win condition, run check win condition after every cycle :)
      io.sockets.emit("PreGame", currentGame);
    }


    //change phase to "pregame" so there is no voting, perhaps no timer?
    io.sockets.emit('PreGame', currentGame);
    //start timer
    let preGameTimer = 5;
    const preGameTimerLoop =
      setInterval(() => {
        preGameTimer -= 1;
        io.sockets.emit('timer', preGameTimer);
        console.log(preGameTimer);
        if (preGameTimer == 0) {
          currentGame.day = false;
          nightPhase(currentGame);
          clearInterval(preGameTimerLoop);
        }
      }, 1000);
  })

  /////////////////////////////////////////////////////////////
  socket.on('vote', (voteObject) => {
    // console.log(voteObject.me, voteObject.vote);
    currentGame.votes[voteObject.me] = voteObject.vote;

  })

  socket.on('docChoice', (protectedId) => {
    currentGame.players.forEach((player) => {
      if (player.id === protectedId) {
        player.protected = true;
      }
    })
  })
})


/////////////////////////////////////////////////////////////////////////////////////////
const nightPhase = (currentGame) => {
  //check win conditions

  if (currentGame.numberOfAliveWerewolves() >= currentGame.numberOfAliveVillagers()) {
    io.sockets.emit('endGame', 'Werewolves win');
    return;
  }
  if (currentGame.numberOfAliveWerewolves() === 0) {
    io.sockets.emit('endGame', 'Villagers win');
    return;
  }


  io.sockets.emit('changePhase', currentGame);
  //send and receiving the game data
  let nightTimer = 10;
  const nightTimerLoop =
    setInterval(() => {
      nightTimer -= 1;
      io.sockets.emit('timer', nightTimer);
      console.log(nightTimer);
      if (nightTimer == 0) {
        clearInterval(nightTimerLoop);
        // collect votes from client
        currentGame.determineKill();
        // calculate deaths
        // broadcast newGame
        currentGame.day = true;
        io.sockets.emit('changePhase', currentGame);
        //reset protected status
        currentGame.players.forEach((player) => {
          player.protected = false;
        })
        // call dayPhase
        dayPhase(currentGame);
      }
    }, 1000);
}
/////////////////////////////////////////////////////////////////////////
const dayPhase = (currentGame) => {
  if (currentGame.numberOfAliveWerewolves() >= currentGame.numberOfAliveVillagers()) {
    io.sockets.emit('endGame', 'werewolves win');
    return;
  }
  if (currentGame.numberOfAliveWerewolves() === 0) {
    io.sockets.emit('endGame', 'villagers win');
    return;
  }
  let dayTimer = 10;
  const dayTimerLoop =
    setInterval(() => {
      dayTimer -= 1;
      io.sockets.emit('timer', dayTimer);
      console.log(dayTimer);
      if (dayTimer == 0) {
        clearInterval(dayTimerLoop);
        // collect votes from client
        currentGame.determineKill();
        // calculate deaths
        // broadcast newGame
        currentGame.day = false;
        io.sockets.emit('changePhase', currentGame);
        // call dayPhase
        nightPhase(currentGame);
      }
    }, 1000);

}


////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
