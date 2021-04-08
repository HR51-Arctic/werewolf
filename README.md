# Werewolf

Werewolf is an online multiplayer party game meant to reacreate the social experience of playing the classic card game with none of the setup hassle. Join together with seven or more of your closest friends and work together to figure out which one of you is the werewolf terrorizing the town in the night. But be careful, if you aren't convincing, you might find yourself at the end of the villagers' pitchforks!

![](client/src/images/WerewolfLobby.png)

## Installation

OS X & Linux

From the root directory type:

```sh
npm install
```
Then:

```sh
npm run build
```

In second terminal type:

```sh
npm start
```

Your game server will be running locally on port 3000. Navigate your browser to http://localhost:3000/ to enter the game lobby.

## Game Rules

Once you reach the game lobby, be sure to select a username in the upper left corner. Once seven or more players have selected a username, a 'play' button will appear below the list of players. Be sure that everone involved in the game is in a Discord, Zoom, or other audio/video application for ultimate enjoyment.

Once the play button is clicked, all players will be taken to the pregame phase of the game where they are shown their randomely assigned role, either 'villager', 'doctor', 'seer', or 'werewolf'. This is your time to chat with everyone, introduce yourself, and begin to lay your deceitful traps. A timer will countdown the time left until the next phase of the game begins.

Soon, night will fall on this sleepy village and the real game begins. Those who were assigned the role of werewolf will now vote on which of the villagers they want to kill. Werewolves will also have a chat window that only they can see to plan their dasterdly deeds, but beware, villagers may be able to hear the click of keyboard. Be stealthy!

The doctor will be able to heal one person each night. If the werewolves attempt to kill the same person the doctor protects, their efforts will be thwarted and the player will survice the night.

The seer is able to pick one person a night and see their role. Use this information wisely! But remember, if you divulge your seer abilities too soon in the game, the werewolves may make you their next victim!

Villagers are vulnerable during the night and have no special abilities. Pray the wolves don't come for you.

In the morning, someone will be dead. It is now your job to talk amongst yourselves and vote for who you think is a werewolf. Once the timer hits 0, the votes will be tallied and the person with the most votes will be killed. Choose wisely, or you will be doing the werewolves job for them!

## Win Conditions

The villagers win if all werewolves have been killed, and the werewolves win if the number of villagers drops to be equal to the number of remaining werewolves.

## Issues / Bug Report

Notice something wrong with the game? Let us know and we will get right on it!

Head to <https://github.com/HR51-Arctic/werewolf/issues> and submit a new issue. We greatly appreciate it!

## Contributing

1. Fork it (<https://github.com/HR51-Arctic/werewolf>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Future Features

1. Multiple lobbies for simultaneous games.
2. Improved visuals and smoother transitions between game phases.