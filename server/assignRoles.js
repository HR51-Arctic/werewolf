const Player = require('./playerClass.js')
//Take an array of players already instantiated as player by class and defines all the roles and populates the game class
//no return changes game in place
const assignRoles = (currentGame, playerPool) => {
  //get wolves
  if (playerPool.length === 1) {
    playerPool[0].role = 'doctor'
    currentGame.players.push(playerPool[0])
    //spoofing players for debug purposes
    for (let x = 0; x < 50; x++) {
      currentGame.players.push(new Player(x.toString()))
    }
    return
  }
  let wolvesCount;
  //determine how many wolves desired
  if (playerPool.length >= 4 && playerPool.length < 7) wolvesCount = 1;
  if (playerPool.length >= 7 && playerPool.length <= 15) wolvesCount = 2;
  if (playerPool.length > 15) {
    let additionalWolves = Math.floor((playerPool.length - 16) / 4);
    wolvesCount = 3 + additionalWolves;
  }

  for (let x = 0; x < wolvesCount; x++) {
    let wolfIndex = Math.floor(Math.random() * playerPool.length);
    let wolf = playerPool.splice(wolfIndex, 1)[0];
    wolf.role = "werewolf";
    currentGame.players.push(wolf);
  }

  let seerIndex = Math.floor(Math.random() * playerPool.length);
  let seer = playerPool.splice(seerIndex, 1)[0];

  seer.role = "seer";
  currentGame.players.push(seer);



  let docIndex = Math.floor(Math.random() * playerPool.length);
  let doc = playerPool.splice(docIndex, 1)[0];
  doc.role = "doctor";
  currentGame.players.push(doc);


  //add rest
  currentGame.players = [...currentGame.players, ...playerPool];
  playerPool = []; //once all players in game reset player pool to empty arr
};

module.exports = assignRoles;
