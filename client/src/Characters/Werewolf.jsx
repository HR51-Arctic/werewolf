import React from "react";

const actions = ["Kill", "Vote"];

const Werewolf = () => {
  return (
    <div>
      <div>
        {actions.map((action) => {
          return (
            <select>
              <option key={action} value={action}>
                {action}
              </option>
            </select>
          );
        })}
      </div>
    </div>
  );
};

export default Werewolf;
