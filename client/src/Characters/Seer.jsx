import React from "react";

const actions = ["See", "Vote"];

const Seer = () => {
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

export default Seer;
