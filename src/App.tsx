import React from 'react';
import './App.scss';
import {Points} from "./models/player.model";
import Player from "./player/Player";
import {usePlayersState} from "./store/player.store";
import {PlayersMenu} from "./players-menu/PlayersMenu";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {DeletePlayersDialog} from "./delete-players-dialog/DeletePlayersDialog";

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

  const setPlayerName = (name: string, index: number) => {
    setPlayers(
      players.map((player, i) => i === index ? {...player, name} : player));
  }

  return (
    <div className="app">
      <div className="player-table-container">
        <div className="player-names">
          {players.map((player, index) => (
            <input key={index}
                     className="player-name"
                     type="text"
                     defaultValue={player.name}
                     onBlur={(event) => setPlayerName(event.target.value, index)}
              />
          ))}
        </div>
        <div className="player-table">
          {players.map((player, index) => (
            <Player key={index}
                    player={player}
                    onPointsChange={(points) => handlePointsChange(points, index)}/>
          ))}
        </div>
        <div className="player-scores">
          {players.map((player, i) =>
            <div className="player-score player-header-cell" key={i}>
              {player.points.reduce((a: number, b: Points) => a + (b || 0), 0)}
            </div>
          )}
        </div>
      </div>
      <PlayersMenu onAddPlayer={addPlayer}
                   onClearPoints={clearPoints}/>
      <DeletePlayersDialog players={players} open={true} />
    </div>
  );
}

export default App;
