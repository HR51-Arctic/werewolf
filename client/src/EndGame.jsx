import React, { useState, useEffect } from 'react';

const EndGameModal = ({ endGame, clickHandler }) => {

  // let endGameTimer = 5;
  // useEffect(() => {
  //   const endGameTimerLoop = setInterval(() => {
  //     endGameTimer -= 1;
  //     console.log(endGameTimer)
  //     if (endGameTimer == 0) {
  //       clearInterval(endGameTimerLoop);
  //       clickHandler();
  //     }
  //   }, 1000);
  // });



  return (
    <div id="endGameBackground">
      <div id="endGameModal">
        <div id="endGameMessage" className="blood">{endGame}</div>
        <div id="bloodContainer">
          <div className="drop one"></div><div className="drop two"></div><div className="drop three"></div><div className="drop four"></div>
        </div>

        {/* <div className="wave"></div> */}
        {/* <button id="endGameButton" onClick={() => clickHandler()}>Play Again</button> */}
      </div>
    </div>

  );
}

export default EndGameModal;