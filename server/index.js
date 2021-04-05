const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const Game = require('./gameClass.js')
const Player = require('./playerClass.js')
const assignRoles = require('./assignRoles.js')

const port = process.env.PORT || 3000;
const index = require('./routes/index');

app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const clients = [];

let currentGame

io.on('connection', (socket) => {
  console.log("New client connected");

  clients.push(socket.id);
  // console.log(game);
  socket.emit('myId', socket.id);
  io.sockets.emit('GetParticipants', clients);

  socket.on('disconnect', () => {
    console.log('client disconnected');
    clients.splice(clients.indexOf(socket.id), 1);
    if (currentGame) {
      currentGame.removePlayer(socket.id)
    }
    io.sockets.emit('GetParticipants', clients);

  })
  socket.on('StartGame', () => {
    // this is only available if clients.length >= 7
    let werewolfCounter = 0;
    if (!currentGame) {
      currentGame = new Game()

    }

    // var newGame = new Game(); ---> for futurue instancing for many game states. Right now single state for MVP
    // currentGame = newGame

    let playerPool = []
    clients.forEach((client) => {
      var newPlayer = new Player(client);
      playerPool.push(newPlayer);

    })
    if (playerPool.length >= 7) {
      assignRoles(currentGame, playerPool)
      io.sockets.emit('PreGame', currentGame);
    }
  })
})


server.listen(port, () => {
  console.log(`Server listening on ${port}`)
});


