import React, { useState } from "react";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState(true);

  if (!edit) {
    return <Profile />;
  } else {
    return (
      <div>
        <form>
          <input
            name="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="password"
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            name="email"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
        <button
          type="submit"
          value="Submit"
          onClick={() => console.log("Changes saved!") + setEdit(false)}
        >
          Save Changes
        </button>
      </div>
    );
  }
};

const Profile = () => {
  const [edit, setEdit] = useState(false);

  if (edit) {
    return <EditProfile />;
  } else {
    return (
      <>
        <div
          style={{ height: "100px", width: "50%", border: "3px solid black" }}
        >
          <span>Username</span>
          <span>user@email.com</span>
        </div>
        <div
          style={{ height: "100px", width: "25%", border: "3px solid black" }}
        >
          <span>Total Wins</span>
          <span>Werewolf Wins</span>
          <span>Villager Wins</span>
        </div>
        <button type="submit" value="Submit" onClick={(e) => setEdit(true)}>
          Edit Profile
        </button>
      </>
    );
  }
};

export default Profile;
