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

module.exports = Player