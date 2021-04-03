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

// app.get('/', (req, res) => {
//   res.send('server route works')
// })
const clients = [];

let interval;
io.on('connection', (socket) => {
  console.log("New client connected");
  const clients2 = Object.keys(io.engine.clients);
  // console.log(Object.keys(io.engine.clients));
  clients.push(socket.id);
  console.log(clients);
  socket.emit('GetMessage', socket.id);
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getAPIAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    console.log('client disconnected');
    const leaving = clients.pop()
    socket.broadcast.to(clients[0]).emit('GetMessage', `${leaving} left!`)
    // clearInterval(interval);
  })
})



const getAPIAndEmit = socket => {
  const response = new Date();
  io.sockets.emit("FromAPI", response);
}




server.listen(port, () => {
  console.log(`Server listening on ${port}`)
});