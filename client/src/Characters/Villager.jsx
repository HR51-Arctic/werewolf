import React from "react";

const actions = ["Lynch", "Vote"];

const Villager = () => {
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

export default Villager;
