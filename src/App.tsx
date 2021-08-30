import React from 'react';
import './App.scss';
import {Points} from "./models/player.model";
import Player from "./player/Player";
import {usePlayersState} from "./store/player.store";
import {PlayersMenu} from "./players-menu/PlayersMenu";

function App() {
  const [players, setPlayers] = usePlayersState();

  if (players.length === 0) {
    setPlayers([{name: "Liam", points: [null]}]);
  }

  const handlePointsChange = (points: Points[], index: number) => {
    setPlayers(
      players.map((player, i) => i === index ? {...player, points} : player));
  }

  const addPlayer = () => {
    setPlayers(players.concat({name: `Player ${players.length + 1}`, points: [null]}));
  }

  const clearPoints = () => {
    setPlayers(players.map(player => ({...player, points: []})));
  }


  return (
    <div className="app">
      <div className="player-table">
        {players.map((player, index) => (
          <Player key={index}
                  player={player}
                  onPointsChange={(points) => handlePointsChange(points, index)} />
        ))}
      </div>
      <PlayersMenu onAddPlayer={addPlayer}
                   onClearPoints={clearPoints}/>
    </div>
  );
}

export default App;
