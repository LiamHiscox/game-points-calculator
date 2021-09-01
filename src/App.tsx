import React, {useState} from 'react';
import './App.scss';
import {Points} from "./models/player.model";
import Player from "./player/Player";
import {usePlayersState} from "./store/player.store";
import {PlayersMenu} from "./players-menu/PlayersMenu";
import {DeletePlayersDialog} from "./delete-players-dialog/DeletePlayersDialog";
import {useSnackbar} from "notistack";
import {LeaderboardDialog} from "./leaderbord-dialog/LeaderboardDialog";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [players, setPlayers] = usePlayersState();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  if (players.length === 0) {
    setPlayers([{id: uuidv4(), name: "Liam", points: [null]}]);
  }

  const handlePointsChange = (points: Points[], id: string) => {
    setPlayers(
      players.map(player => player.id === id ? {...player, points} : player));
  }

  const addPlayer = () => {
    setPlayers(players.concat({id: uuidv4(), name: `Player ${players.length + 1}`, points: [null]}));
    enqueueSnackbar(`${players.length + 1} players`);
  }

  const clearPoints = () => {
    setPlayers(players.map(player => ({...player, points: []})));
  }

  const setPlayerName = (name: string, id: string) => {
    setPlayers(
      players.map(player => player.id === id ? {...player, name} : player));
  }

  const deletePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  }

  return (
    <div className="app">
      <div className="player-table-container">
        <div className="player-names">
          {players.map((player, index) => (
            <input key={index}
                   className="player-name"
                   type="text"
                   value={player.name}
                   onChange={(e) => setPlayerName(e.target.value, player.id)}
                   onClick={(e) => {e.currentTarget.select()}}
                   onSubmit={e => {e.preventDefault(); console.log('submited')}}
            />
          ))}
        </div>
        <div className="player-table">
          {players.map((player, i) => (
            <Player key={i}
                    player={player}
                    onPointsChange={(points) => handlePointsChange(points, player.id)}/>
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
                   onClearPoints={clearPoints}
                   onOpenDelete={() => setDeleteOpen(true)}
                   onOpenLeaderBoard={() => setLeaderboardOpen(true)}
      />
      <DeletePlayersDialog players={players}
                           open={deleteOpen}
                           onDelete={deletePlayer}
                           onClose={() => setDeleteOpen(false)}
      />
      <LeaderboardDialog players={players}
                         open={leaderboardOpen}
                         onClose={() => setLeaderboardOpen(false)}
      />
    </div>
  );
}

export default App;
