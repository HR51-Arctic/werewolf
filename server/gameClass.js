const Player = require('./playerClass.js')

class Game {
  constructor() {
    this.players = []; // array of player objects // Possible object?
    this.timer = 30;   // counts downs day night alternates 30 second intervals at first
    this.cycle = true; // can be false for night
  }

  addPlayer(id, name = id, admin=false) {

  }

}


module.exports = Game