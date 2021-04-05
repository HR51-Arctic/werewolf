const Player = require('./playerClass.js')

class Game {
  constructor() {
    this.players = []; // array of player objects // Possible object?
    this.timer = 30;   // counts downs day night alternates 30 second intervals at first
    this.cycle = true; // can be false for night
  }

  addPlayer(id, name = id, admin=false) {
    let player = new Player(id, name, admin)
    this.players.push(player)

  }

  removePlayer(id) {
    for (let x=0; x < this.players.length; x++) {
      let current = this.players[x]
      if (current.id === id) {
        this.players.splice(x, 1)
        console.log(this.players)
        return
      }
    }
  }
}


module.exports = Game