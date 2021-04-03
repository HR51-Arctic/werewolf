import React, {useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:3000';

function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>

  );
}

// import React from 'react'

// class App extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {}

//   }

//   render() {
//     return(
//       <div>React good to go</div>
//     )
//   }
// }



export default App;
