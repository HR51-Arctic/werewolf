import React from "react";

const actions = ["Save", "Vote"];

const Doctor = () => {
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

export default Doctor;
