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
    if (!currentGame) {
      currentGame = new Game()

    }

    // var newGame = new Game(); ---> for futurue instancing for many game states. Right now single state for MVP
    // currentGame = newGame



    // random role generator? so it can be added to newPlayer
    let playerPool = []
    clients.forEach((client) => {
      var newPlayer = new Player(client);
      playerPool.push(newPlayer);

    })
    console.log(playerPool)
    console.log(currentGame)



    //get wolves
    let wolvesCount
    //determine how many wolves desired
    if (playerPool.length <= 15) wolvesCount = 2
    if (playerPool.length > 15) {
      let additonalWolves = Math.floor((playerPool.length - 16) /4)
      wolvesCount = 3 + additionalWolves
    }

    for (let x=0; x<wolvesCount; x++) {
      let wolfIndex = Math.floor(Math.random() * playerPool.length)
      let wolf = playerPool.splice(wolfIndex,1)[0]
      wolf.role = 'wolf'
      currentGame.players.push(wolf)
    }
    console.log(currentGame)
    // const randomElement = array[Math.floor(Math.random() * array.length)];
    let seirIndex = Math.floor(Math.random() * playerPool.length)
    let seir = playerPool.splice(seirIndex,1)[0]
    console.log("seri", seir)
    seir.role = 'seir'
    currentGame.players.push(seir)
    console.log(currentGame)

    //get doctor
    let docIndex = Math.floor(Math.random() * playerPool.length)
    let doc = playerPool.splice(docIndex,1)[0]
    doc.role = 'doctor'
    currentGame.players.push(doc)
    console.log(currentGame)

    //add rest
    currentGame.players = [...currentGame.players, ...playerPool]
    console.log(currentGame)
    console.log(playerPool)

// There is always one seer and one doctor.
// When there are 15 or less players total, there are 2 werewolves.
// When there are 16 players there are 3 werewolves and as the number of participants grow: there is one werewolf for every 4 players.
// https://docs.google.com/document/d/182XhKE_ryuzE-wlKsUlBoRr5kgxEETCD7X7XNhxhkgY/edit
// https://playwerewolf.co/pages/rules
    io.sockets.emit('PreGame', currentGame);
  })
})


server.listen(port, () => {
  console.log(`Server listening on ${port}`)
});


