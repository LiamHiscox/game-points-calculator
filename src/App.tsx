import React from 'react';
import './App.scss';
import {Points} from "./models/player.model";
import Player from "./player/Player";
import {usePlayersState} from "./store/player.store";

function App() {
  const [players, setPlayers] = usePlayersState();

  if(players.length === 0) {
    setPlayers([
      {name: "Liam", points: [null]}
    ])
  }

  const handlePointsChange = (points: Points[], index: number) => {
    setPlayers(
      players.map((player, i) => i === index ? {...player, points} : player)
    );
  }

  return (
    <div className="app">
      <div className="player-table">
        {players.map((player, index) => (
          <Player player={player}
                  onPointsChange={(points) => handlePointsChange(points, index)} />
        ))}
      </div>
      <div className="player-scores">
        { players.map(player =>
            <div className="player-score">
              {player.points.reduce((a: number, b: Points) => a + (b || 0), 0)}
            </div>
        ) }
      </div>
    </div>
  );
}

export default App;
