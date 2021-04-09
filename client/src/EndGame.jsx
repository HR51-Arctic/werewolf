import React, { useState, useEffect } from 'react';

const EndGameModal = ({ endGame, clickHandler }) => {
  return (
    <div id="endGameBackground">
      <div id="endGameModal">
        <div id="endGameMessage" className="blood">{endGame}</div>
        <div id="bloodContainer">
          <div className="drop one"></div><div className="drop two"></div><div className="drop three"></div><div className="drop four"></div>
        </div>

        {/* <div className="wave"></div> */}
        <button id="endGameButton" onClick={() => clickHandler()}>Play Again</button>
      </div>
    </div>

  );
}

export default EndGameModal;