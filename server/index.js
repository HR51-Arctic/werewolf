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
  constructor(clients) {
    this.players = clients;
    this.timer = 30;   // counts downs day night alternates 30 second intervals at first
    this.cycle = 'day'; //can be false
    this.running = false; //boolean true/false
  }

  // startGame() {
  //   assignRoles()
  // }

  // assignRoles() {
  //   if(this.players.length <  )
  // }

}

class Player {
  constructor (id, name, admin) {
    //name from user input, else if null value set name to ID from socket.id
    this.name = name || id
    this.id = id,
    this.role = 'villager'
    this.admin = admin || false
    this.alive = true
  }
}

/////////////////////////
const clients = [];
// let game = new Game();

let interval;
io.on('connection', (socket) => {
  console.log("New client connected");
  // let player = new Player();
  // game.players.push(player);

  clients.push(socket.id);
  // console.log(game);
  io.sockets.emit('GetParticipants', clients);
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getAPIAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    console.log('client disconnected');
    clients.splice(clients.indexOf(socket.id), 1);
    io.sockets.emit('GetParticipants', clients);
    // clearInterval(interval);
  })
  socket.on('startGame', () => {
    // this is only available if clients.length >= 7
    var newGame = new Game(clients);
    // random role generator? so it can be added to newPlayer
    clients.forEach(client => {
      var newPlayer = new Player(client);
      newGame.players.push(newPlayer);
    })
  })
})

const getAPIAndEmit = socket => {
  const response = new Date();
  io.sockets.emit("FromAPI", response);
}
// const getGameStateAndEmit = socket => {
//   const response = game
//   io.sockets.emit("startGame", response);
// }

server.listen(port, () => {
  console.log(`Server listening on ${port}`)
});


