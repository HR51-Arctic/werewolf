const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const Game = require("./gameClass.js");
const Player = require("./playerClass.js");
const assignRoles = require("./assignRoles.js");
const db = require("../database/index.js");
const path = require("path");
const favicon = require("serve-favicon");

const port = process.env.PORT || 3000;
const index = require("./routes/index");

app.use(express.static("public"));
app.use(express.json());
app.use(index);
app.use(favicon(path.join("client", "src", "images", "favicon.ico")));

const server = http.createServer(app);

const io = socketIo(server);

let clients = [];
let unregisteredClients = [];
let players = [];
let messages = [];
let currentGame;
let gameSettings = {
  preGameTimer: 30,
  dayTimer: 60,
  nightTimer: 30,
};

io.on("connection", (socket) => {
  if (currentGame) {
    socket.emit("gameInProgress", true);
    return;
  }
  console.log("New client connected");
  clients.push(socket.id);
  unregisteredClients.push(socket.id);
  socket.emit("myId", socket.id);
  socket.emit("GetSettings", gameSettings);
  io.sockets.emit("GetParticipants", players);

  socket.on("disconnect", () => {
    if (socket.username) {
      console.log(socket.username, "disconnected");
    } else {
      console.log("client disconnected");
    }
    clients.splice(clients.indexOf(socket.id), 1);
    unregisteredClients.splice(unregisteredClients.indexOf(socket.id), 1);
    for (let i = 0; i < players.length; i++) {
      if (players[i].id === socket.id) {
        players.splice(i, 1);
      }
    }
    if (currentGame) {
      currentGame.removePlayer(socket.id);
    }
    io.sockets.emit("GetParticipants", players);
  });
  /////////////////////////////login and signup//////////////////////////////////
  socket.on("Login", (username, password) => {
    socket.username = username;
    console.log(username, "logged in");
    unregisteredClients.splice(unregisteredClients.indexOf(socket.id), 1);
    console.log(unregisteredClients);
    players.push(new Player(socket.id, socket.username));
    io.sockets.emit("GetParticipants", players);
  });

  // socket.on('Signup', (username, password, email) => {
  //   console.log(username, password, email, 'is signing up');
  //   socket.username = username;
  //   players.push(new Player(socket.id, socket.username));
  //   io.sockets.emit('GetParticipants', players);

  // });

  /////////RESET LOGIC //////////
  socket.on("initializeReset", () => {
    players = [];
    messages = [];
    currentGame.players.forEach((player) => {
      player.role = "villager";
      player.alive = true;
      if (clients.indexOf(player.id) !== -1) {
        players.push(player);
      }
    });
    currentGame = null;
    io.sockets.emit("resetGame", currentGame);
    io.sockets.emit("GetParticipants", players);
    io.sockets.emit("gameInProgress", false);
  });
  //////////Settings Logic //////////
  socket.on("NewSettings", (newSettings) => {
    gameSettings = newSettings;
    io.sockets.emit("GetSettings", gameSettings);
  });

  //////////////////////////////////////////////////////////////
  // Function that triggers on 'Play' button in lobby
  socket.on("StartGame", () => {
    if (!currentGame) {
      currentGame = new Game(gameSettings);
    }

    let playerPool = players;

    for (let i = 0; i < unregisteredClients.length; i++) {
      io.to(unregisteredClients[i]).emit("gameInProgress", true);
    }

    if (playerPool.length >= 7) {
      assignRoles(currentGame, playerPool);
      currentGame.active = true;
      io.sockets.emit("PreGame", currentGame);
    }

    io.sockets.emit("PreGame", currentGame);
    let preGameTimer = currentGame.preGameTimer;
    const preGameTimerLoop = setInterval(() => {
      preGameTimer -= 1;
      io.sockets.emit("timer", preGameTimer);
      console.log(preGameTimer);
      if (preGameTimer == 0) {
        currentGame.day = false;
        nightPhase(currentGame);
        clearInterval(preGameTimerLoop);
      }
    }, 1000);
  });

  /////////////////////////////////////////////////////////////
  socket.on("vote", (voteObject) => {
    currentGame.votes[voteObject.me] = voteObject.vote;
    io.sockets.emit("updateVotes", currentGame);
  });

  socket.on("docChoice", (protectedId) => {
    currentGame.players.forEach((player) => {
      if (player.id === protectedId.vote) {
        player.protected = true;
      }
    });
  });

  //////// werewolf chat ///////////
  socket.on("werewolfMessages", (message) => {
    messages.push(message);
    io.sockets.emit("GetWerewolfChat", messages);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////
const nightPhase = (currentGame) => {
  if (
    currentGame.numberOfAliveWerewolves() >=
    currentGame.numberOfAliveVillagers()
  ) {
    io.sockets.emit("endGame", "Werewolves win");
    return;
  }
  if (currentGame.numberOfAliveWerewolves() === 0) {
    io.sockets.emit("endGame", "Villagers win");
    return;
  }

  io.sockets.emit("changePhase", currentGame);
  let nightTimer = currentGame.nightTimer;
  const nightTimerLoop = setInterval(() => {
    nightTimer -= 1;
    io.sockets.emit("timer", nightTimer);
    console.log(nightTimer);
    if (nightTimer == 0) {
      clearInterval(nightTimerLoop);
      currentGame.determineKill();
      currentGame.day = true;
      io.sockets.emit("changePhase", currentGame);
      currentGame.players.forEach((player) => {
        player.protected = false;
      });
      dayPhase(currentGame);
    }
  }, 1000);
};
/////////////////////////////////////////////////////////////////////////
const dayPhase = (currentGame) => {
  if (
    currentGame.numberOfAliveWerewolves() >=
    currentGame.numberOfAliveVillagers()
  ) {
    io.sockets.emit("endGame", "werewolves win");
    return;
  }
  if (currentGame.numberOfAliveWerewolves() === 0) {
    io.sockets.emit("endGame", "villagers win");
    return;
  }
  let dayTimer = currentGame.dayTimer;
  const dayTimerLoop = setInterval(() => {
    dayTimer -= 1;
    io.sockets.emit("timer", dayTimer);
    console.log(dayTimer);
    if (dayTimer == 0) {
      clearInterval(dayTimerLoop);
      currentGame.determineKill();
      currentGame.day = false;
      io.sockets.emit("changePhase", currentGame);
      nightPhase(currentGame);
    }
  }, 1000);
};

////////////////////////////////////////////////////////////////////////
app.post("/registerUser", function (req, res) {
  const { username, password, email } = req.body;
  db.registerUser(username, password, email, (err, data) => {
    if (err) {
      console.log("register user erroring out");
      res.status(500).send(data);
    } else {
      console.log("successfully registered", username);
      res.status(200).send(data);
    }
  });
});

app.post("/login", function (req, res) {
  const { username, password } = req.body;
  db.verifyUser(username, (err, data) => {
    if (err) {
      console.log("login not successful");
      res.status(500).send(data);
    } else {
      var x = data.rows[0].userpassword;
      if (password === x) {
        console.log(username, "logged in");
        res.status(200).send("done");
      } else {
        res.status(500).send("Wrong password, foo");
      }
    }
  });
});
///////////////////////////////////////////////////////////////////////
server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
