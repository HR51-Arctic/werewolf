import React, { useState } from "react";

// Here just in case we don't get to third party auth ------------------
const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
        onClick={() => {
          console.log(`Welcome ${username}`);
          props.handleSignup(username, password, email);
        }}
      >
        Sign Up
      </button>
    </div>
  );
};
//-----------------------------------------------------------------------

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, signUp] = useState(false);
  const [error, setError] = useState(false);

  if (newUser) {
    return <SignUp handleSignup={props.handleSignup} />;
  } else {
    if (!props.loggedIn) {
      return (
        <div className="login">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (username.length > 20) {
                setUsername('')
                setError("Username must be 20 characters or less")
                return
              }
              props.handleLogin(username, () => {
                setError(`${username} is taken`);
                setUsername('')
              });
            }}
          >
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={error ? error : "Username"}
            />
            {/* <input
              name='password'
              type='text'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Password'
            /> */}
            <input
              type="submit"
              value="Submit"
              // onClick={() => {
              //   props.handleLogin(username, password)
              // }}
            ></input>
          </form>
          {/* <button
            type='submit'
            value='Submit'
            onClick={() => signUp(true)}
          >Not a member? Sign Up!</button> */}
          {/* <button
            type='submit'
            value='Submit'
            onClick={() => {
              console.log('Playing anonomously')
            }
            }
          >Play Anonomously</button> */}
          <div></div>
        </div>
      );
    }
    return (
      <div
        className="login"
        style={{
          color: 'rgb(75, 3, 3)',
          fontSize: '20px',
          textAlign: 'center',
          fontWeight: 'bolder',
          marginBottom: '2px',
        }}
      >
        Welcome <span style={{textDecoration: 'underline'}}>{username}</span>, please wait for the game to begin
      </div>
    )
  }
};

export default Login;
