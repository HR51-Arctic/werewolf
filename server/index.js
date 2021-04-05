const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();

const port = process.env.PORT || 3000;
const index = require('./routes/index');

app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);


/////////////////////////
class Game {
  constructor() {
    this.players = []; // array of socket ids
    this.timer = 30;   // counts downs day night alternates 30 second intervals at first
    this.cycle = true; // can be false for night
  }

}

class Player {
  constructor(id, name, admin) {
    //name from user input, else if null value set name to ID from socket.id
    this.name = name || id;
    this.id = id;
    this.role = 'villager';
    this.admin = admin || false;
    this.alive = true;
  }
}

/////////////////////////
const clients = [];


io.on('connection', (socket) => {
  console.log("New client connected");

  clients.push(socket.id);
  // console.log(game);
  socket.emit('myId', socket.id);
  io.sockets.emit('GetParticipants', clients);

  socket.on('disconnect', () => {
    console.log('client disconnected');
    clients.splice(clients.indexOf(socket.id), 1);
    io.sockets.emit('GetParticipants', clients);

  })
  socket.on('StartGame', () => {
    // this is only available if clients.length >= 7
    let werewolfCounter = 0;
    var newGame = new Game();
    // random role generator? so it can be added to newPlayer
    clients.forEach(client => {
      var newPlayer = new Player(client);
      if (werewolfCounter === 0) {
        newPlayer.role = 'werewolf';
        werewolfCounter += 1;
      }
      newGame.players.push(newPlayer);
    })
    io.sockets.emit('PreGame', newGame);
  })
})


server.listen(port, () => {
  console.log(`Server listening on ${port}`)
});


