const Player = require('./playerClass.js')

class Game {
  constructor() {
    this.players = []; // array of player objects // Possible object?
    this.timer = 30;   // counts downs day night alternates 30 second intervals at first
    this.day = true; // can be false for night
  }

  addPlayer(id, name = id, admin = false) {
    let player = new Player(id, name, admin)
    this.players.push(player)

  }

  removePlayer(id) {
    for (let x = 0; x < this.players.length; x++) {
      let current = this.players[x]
      if (current.id === id) {
        this.players.splice(x, 1)
        console.log(this.players)
        return
      }
    }
  }

  //methods for checking number of werewolves and villagers
  numberOfAliveVillagers() {
    var count = 0;
    this.players.forEach(player => {
      if (player.role === 'villager' && player.alive) {
        count += 1;
      }
    })
    return count;
  }

  numberOfAliveWerewolves() {
    var count = 0;
    this.players.forEach(player => {
      if (player.role === 'werewolf' && player.alive) {
        count += 1;
      }
    })
    return count;
  }
}


module.exports = Game