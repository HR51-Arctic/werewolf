import React from "react";

import WerewolfLogo from "./images/WerewolfLogo.svg";

const AppHeader = () => {
  return (
    <div className="appHeaderContainer">
      <img
        src={WerewolfLogo}
        alt="Werewolf/ Werewolf Logo"
        className="werewolfLogo"
      />
    </div>
  );
};

export default AppHeader;
