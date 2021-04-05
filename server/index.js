const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const Game = require('./gameClass.js')
const Player = require('./playerClass.js')

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
    var newGame = new Game();
    currentGame = newGame
    // random role generator? so it can be added to newPlayer
    clients.forEach(client => {
      var newPlayer = new Player(client);
      newGame.players.push(newPlayer);
    })

    io.sockets.emit('PreGame', newGame);
    //start timer
    let preGameTimer = 5;
    const preGameTimerLoop =
      setInterval(() => {
        preGameTimer -= 1;
        io.sockets.emit('timer', preGameTimer);
        console.log(preGameTimer);
        if (preGameTimer == 0) {
          clearInterval(preGameTimerLoop);
        }
      }, 1000);


    //when it hits zero, emit to everyone to transition to night
    //we start the nightfunction

  })
})

//night function

server.listen(port, () => {
  console.log(`Server listening on ${port}`)
});


