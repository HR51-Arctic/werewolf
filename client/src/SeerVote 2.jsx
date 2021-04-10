import React from "react";

class SeerVote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false,
    };
    this.reveal = this.reveal.bind(this);
  }

  reveal(id) {
    let { gameState } = this.props;
    for (let x = 0; x < gameState.players.length; x++) {
      let player = gameState.players[x];
      if (player.id === id) {
        this.setState({
          revealed: player,
        });
        return;
      }
    }
  }

  render() {
    let { gameState, myId } = this.props;
    const { revealed } = this.state;
    if (!revealed) {
      return (
        <div id="seerContainer">
          <h4>Who do you want to SEEEE</h4>
          <div>
            {gameState.players.map((player) => {
              if (player.alive && player.id !== myId) {
                return (
                  <button onClick={() => this.reveal(player.id)}>
                    {player.name}
                  </button>
                );
              }
            })}
          </div>
        </div>
      );
    } else {
      return (
        <h4>
          {revealed.name} is a {revealed.role}
        </h4>
      );
    }
  }
}

export default SeerVote;
