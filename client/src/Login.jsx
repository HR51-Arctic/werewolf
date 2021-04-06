import React, { useState } from "react";

// Here just in case we don't get to third party auth ------------------
const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 id="modalHeader">Sign up here</h2>
        <form className="modalForm">
          <input
            className="modalField"
            name="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="modalField"
            name="password"
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="modalField"
            name="email"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
        <button
          className="modalButton"
          type="submit"
          value="Submit"
          onClick={() => {
            console.log(`Welcome ${username}`);
            props.handleSignup(username, password, email);
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
//-----------------------------------------------------------------------

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, signUp] = useState(false);

  if (newUser) {
    return <SignUp handleSignup={props.handleSignup} />;
  } else {
    return (
      <div className="modal">
        <div className="modalContainer">
          <h2 id="modalHeader">Are you ready to play a game?</h2>
          <form className="modalForm">
            <input
              className="modalField"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              className="modalField"
              name="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </form>
          <button
            className="modalButton"
            id="modal"
            type="submit"
            value="Submit"
            onClick={() => {
              console.log("Submit");
              props.handleLogin(username, password);
            }}
          >
            Login
          </button>
          <button
            className="modalButton"
            type="submit"
            value="Submit"
            onClick={() => signUp(true)}
          >
            Not a member? Sign Up!
          </button>
          <button
            className="modalButton"
            type="submit"
            value="Submit"
            onClick={() => {
              console.log("Playing anonomously");
            }}
          >
            Play Anonomously
          </button>
        </div>
      </div>
    );
  }
};

export default Login;
