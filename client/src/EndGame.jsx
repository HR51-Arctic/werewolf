import React, { useState, useEffect } from 'react';

const EndGameModal = ({ endGame, clickHandler }) => {
  return (
    <div id="endGameBackground">
      <div id="endGameModal">
        <div id="endGameMessage" className="blood">{endGame}
        </div>
        <button id="endGameButton" onClick={() => clickHandler()}>Play Again</button>
      </div>
    </div>

  );
}

export default EndGameModal;