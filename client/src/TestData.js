
// How to use:

// For Seer:
// 1) import seervote and testdata into index.jsx
// 2) pass in the testdata as gamestate prop and choose the id of the char your working on
// IE:  import SeerVote import TestData
// IE: <SeerVote gameState={TestData} myId='ONooukVD9f7wxvdPAAAJ'/>

// For Doctor:
// 1) import docvote and testdata in app.jsx
// 2) replace line 190 with below
// return <DocVote docChoice={docChoice.bind(this)} gameState={TestData} myId="tqhdWXa3e5ceLNZgAAAH" />
// NOTE: since there are no players it well break when sending save to socket

let TestData = {
active : true,
day : true,
dayTimer : 10,
nightTimer : 10,
preGameTimer : 1,
voiceUrl : "noUrl",
votes : {},
  players: [
    {
      name: 'player 1',
      id: "pKd5RIReqFC1MSITAAAB",
      role: 'villager',
      protected: false,
      alive: true,
      targeted: 0,
      admin: false
    },
    {
      name: 'player 2',
      id: "iGmnw7vpv9WwgBfgAAAD",
      role: 'villager',
      protected: false,
      alive: true,
      targeted: 0,
      admin: false
    },
    {
      name: 'player 3',
      id: "isJxksnm8qy034yYAAAF",
      role: 'villager',
      protected: false,
      alive: true,
      targeted: 0,
      admin: false
    },
    {
      name: 'player 4',
      id: "tqhdWXa3e5ceLNZgAAAH",
      role: 'doctor',
      protected: false,
      alive: true,
      targeted: 0,
      admin: false
    },
    {
      name: 'player 5',
      id: "ONooukVD9f7wxvdPAAAJ",
      role: 'seer',
      protected: false,
      alive: true,
      targeted: 0,
      admin: false
    },
    {
      name: 'player 6',
      id: "tAnWckbumDTxV93aAAAL",
      role: 'werewolf',
      protected: false,
      alive: true,
      targeted: 0,
      admin: false
    },
    {
      name: 'player 7',
      id: "k28Vh0RRc79iypB1AAAN",
      role: 'werewolf',
      protected: false,
      alive: true,
      targeted: 0,
      admin: false
    },
  ],
};

  module.exports = TestData;