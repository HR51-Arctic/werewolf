const Db = require("pg").Pool;

const db = new Db({
  host: "localhost",
  database: "werewolf",
  port: 5432,
});

const registerUser = (username, password, email, callback) => {
  db.connect((err, client, release) => {
    if (err) {
      return console.log("Error grabbing client");
    } else {
      client.query(
        `INSERT INTO users (username, userPassword, email) VALUES ('${username}', '${password}', '${email}')`,
        (err, result) => {
          release();
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        }
      );
    }
  });
};

const verifyUser = (username, callback) => {
  db.connect((err, client, release) => {
    if (err) {
      return console.log("Error grabbing client");
    } else {
      client.query(
        `SELECT userpassword FROM users WHERE username = '${username}'`,
        (err, result) => {
          release();
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        }
      );
    }
  });
};

const getTopWins = () => {
  db.connect((err, client, release) => {
    if (err) {
      return console.log("Error grabbing client");
    } else {
      client.query(`SELECT * FROM users ORDER BY wins`, (err, result) => {
        release();
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, result);
        }
      });
    }
  });
};

const updateAfterGame = (username, role, victory) => {
  db.connect((err, client, release) => {
    if (err) {
      return console.log("Error grabbing client");
    } else {
      let queryString = `UPDATE users SET numOfGames = numOfGames + 1 WHERE username = '${username}';`;
      //if victory, increment numOfGames, wins, and rolewins
      if (victory) {
        if (role === "villager" || role === "seer") {
          queryString = `UPDATE users SET numOfGames = numOfGames + 1, humanWins = humanWins + 1 WHERE username = '${username}';`;
        } else if (role === "werewolf") {
          queryString = `UPDATE users SET numOfGames = numOfGames + 1, werewolfWins = werewolfWins + 1 WHERE username = '${username}';`;
        }
      }
      //need to check role - then two different queries
      //if not, increment only numOfGames,
      client.query(queryString, (err, result) => {
        release();
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, result);
        }
      });
    }
  });
};

module.exports = {
  registerUser,
  verifyUser,
};
