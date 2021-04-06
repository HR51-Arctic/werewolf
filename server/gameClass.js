const Player = require('./playerClass.js')

class Game {
  constructor() {
    this.players = []; // array of player objects // Possible object?
    this.day = true; // can be false for night
    this.active = false; //boolean values indicates whether game is in progress
    this.votes = {}
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
        return;
      }
    }
  }

  //methods for checking number of werewolves and villagers
  numberOfAliveVillagers() {
    var count = 0;
    this.players.forEach(player => {
      if (player.role !== 'werewolf' && player.alive) {
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

  // method to toggle heal
  toggleProtectedPlayer(id) {
    for (player of this.players) {
      if (player.id === id) {
        player.protected = true;
        return
      }
    }
  }

  // method to toggle protected
  toggleTargetVoteCount(id) {
    for (var x = 0; x < this.players.length; x++) {
      let currentPlayer = this.players[x]
      if (currentPlayer.id === id) {
        currentPlayer.targeted += 1
      }
    }
  }

  // method to check win condition
  checkWinCondition() {
    let wolves = 0
    let players = 0
    this.players.forEach((player) => {
      if (this.player.alive) {
        if (this.player.role === 'werewolf') {
          wolves++
        } else {
          players++
        }
      }
    })
    if (wolves >= players) {
      //wolf win condition
      this.active = false
      return true
    }
    if (!wolves) {
      //villager win condition
      this.active = false
      return true
    }
    return false
  }

  determineKill() {
    // let targetCount = 0
    // let targetedPlayers = []
    //this.votes is an object with key of player(id) and value of Object.values iterate through incrememnte vote counts. after logic reset to empty object {}
    // make sure that the protected person cant be killed
    let voteCount = {};
    for (let key in this.votes) {
      if (voteCount[this.votes[key]] === undefined) {
        voteCount[this.votes[key]] = 1;
      } else {
        voteCount[this.votes[key]] += 1;
      }
    };
    this.votes = {};
    let maxVotes = 0;
    let targeted = '';
    for (let key in voteCount) {
      if (voteCount[key] > maxVotes) {
        maxVotes = voteCount[key];
        targeted = key;
      }
    };
    this.players.forEach(player => {
      if (player.id === targeted) {
        if (player.protected) {
          return;
        } else {
          player.alive = false;
        }
      }
    })
    // this.players.forEach((player, index) => {
    //   if (player.targeted && player.targeted > targetCount) { //make sure target isnt protected
    //     targetedPlayers = [index]
    //   }
    //   if (player.targeted && player.targeted === targetCount) {
    //     targetedPlayers.push(index)
    //   }
    // });
    // // this sets alive status to false, don't need to set it manually
    // // if tie, pick random player to kill
    // if (targetedPlayers.length) {
    //   let indexIndex = Math.floor(Math.random() * targetedPlayers.length)
    //   targetIndex = targetedPlayers[indexIndex];
    //   this.players[targetIndex].alive = false;
    // }
    // // reset player votes to 0
    // this.players.forEach((player) => {
    //   player.targeted = 0
    // })
  }


}


module.exports = Game