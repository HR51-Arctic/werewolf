import React from 'react';

class DocVote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      protect: false
    }
    this.protect = this.protect.bind(this);
  }

  protect(player) {
    this.setState({ protect: player.name });
    this.props.docChoice(player.id);
  }

  render() {
    const { gameState, docChoice, myId } = this.props;
    if (!this.state.protect) {
      return (
        <div>
          <h3>Choose who to protect</h3>
          <div>
            {gameState.players.map((player) => {
              if (player.alive && player.id !== myId) {
                return (
                  <button onClick={() => { this.protect(player) }}>{player.name}</button>
                )
              }
            })}
          </div>
        </div>
      )
    }
    else {
      return (
        <h3>You have protected: {this.state.protect}</h3>
      )
    }
  }
}

export default DocVote;