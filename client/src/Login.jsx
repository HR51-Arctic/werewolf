import React, { useState } from 'react';


// Here just in case we don't get to third party auth ------------------
const SignUp = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <form>
        <input
        name='username'
        type='text'
        value={username}
        placeholder='Username'
        onChange={e => setUsername(e.target.value)}
        />
        <input
        name='password'
        type='text'
        value={password}
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
        />
        <input
        name='email'
        type='text'
        value={email}
        placeholder='Email'
        onChange={e => setEmail(e.target.value)}
        />
      </form>
      <button
      type='submit'
      value='Submit'
      onClick={() => console.log(`Welcome ${username}`)}
      >Sign Up</button>
    </div>
  )
};
//-----------------------------------------------------------------------

const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, signUp] = useState(false);

  if (newUser) {
    return <SignUp />
  } else {
  return (
    <div>
      <form>
        <input
        name='username'
        type='text'
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='Username'
        />
        <input
        name='password'
        type='text'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Password'
        />
      </form>
      <button
      type='submit'
      value='Submit'
      onClick={() => {
        console.log('Submit')
        props.handleLogin(username)
      }}
      >Login</button>
      <button
      type='submit'
      value='Submit'
      onClick={() => signUp(true)}
      >Not a member? Sign Up!</button>
      <button
      type='submit'
      value='Submit'
      onClick={() => {
        console.log('Playing anonomously')
        props.checkMyName()
      }
      }
      >Play Anonomously</button>
    </div>
  )
  }
}

export default Login;