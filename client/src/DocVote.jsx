import React from 'react';

class DocVote extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      protect: false
    }
  }

  protect(player) {
    this.setState({protect: player.name}, this.props.docChoice(player.id));
  }

  render() {
    const { gameState, docChoice } = this.props;
    if (!this.state.protect) {
      return(
        <div>
          <h3>Choose Who to protect</h3>
          <div>
            {gameState.players.map((player) => {
              if (player.alive) {
               return (
               <button onClick={() => { this.protect(player) }}>{player.name}</button>
               )
              }
            }) }
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