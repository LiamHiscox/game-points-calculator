import React, {useState} from 'react';
import './App.scss';
import {PlayerModel, Points} from "./models/player.model";
import {useGameState} from "./store/game.store";
import {DeletePlayersDialog} from "./components/delete-players-dialog/DeletePlayersDialog";
import {useSnackbar} from "notistack";
import {LeaderboardDialog} from "./components/leaderbord-dialog/LeaderboardDialog";
import { v4 as uuidv4 } from 'uuid';
import {PointsTable} from "./points-table/PointsTable";
import {TopBar} from "./top-bar/TopBar";
import {NewGameDialog} from "./components/new-game-dialog/NewGameDialog";
import {HistoryDialog} from "./components/history-dialog/HistoryDialog";
import {deleteGame, saveGame} from "./store/game.db";
import {GameModel} from "./models/game.model";

function App() {
  const [game, setGame] = useGameState();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [newGameOpen, setNewGameOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  if (game.players.length === 0) {
    setGame({
      ...game,
      players: [{id: uuidv4(), name: "Liam", points: [null]}]
    });
  }

  const setGameName = (name: string) => {
    setGame({...game, name})
  }

  const setNewGame = (newPlayers: PlayerModel[]) => {
    saveGame(game);
    const timestamp = new Date();
    const name = `Game ${timestamp.toLocaleDateString()}`;
    setGame({id: uuidv4(), name, timestamp, players: newPlayers});
    setNewGameOpen(false);
  }

  const setOldGame = (oldGame: GameModel) => {
    deleteGame(oldGame.id);
    setGame(oldGame);
    setHistoryOpen(false);
  }

  const deleteOldGame = (id: string) => {
    deleteGame(id);
    setHistoryOpen(false);
  }

  const handlePointsChange = (points: Points[], id: string) => {
    setGame({
      ...game,
      players: game.players.map(player => player.id === id ? {...player, points} : player)
    });
  }

  const addPlayer = () => {
    setGame({
      ...game,
      players: game.players.concat({id: uuidv4(), name: `Player ${game.players.length + 1}`, points: [null]})
    });
    enqueueSnackbar(`${game.players.length + 1} players`);
  }

  const clearPoints = () => {
    setGame({
      ...game,
      players: game.players.map(player => ({...player, points: []}))
    });
  }

  const setPlayerName = (name: string, id: string) => {
    setGame({
      ...game,
      players: game.players.map(player => player.id === id ? {...player, name} : player)
    });
  }

  const deletePlayer = (id: string) => {
    setGame({
      ...game,
      players: game.players.filter(player => player.id !== id)
    });
  }

  return (
    <div className="app">
      <TopBar gameName={game.name}
              onNameChange={setGameName}
              onAddPlayer={addPlayer}
              onClearPoints={clearPoints}
              onOpenDelete={() => setDeleteOpen(true)}
              onOpenLeaderBoard={() => setLeaderboardOpen(true)}
              onNewGame={() => setNewGameOpen(true)}
              onOpenHistory={() => setHistoryOpen(true)}
      />
      <PointsTable onPlayerNameChange={setPlayerName}
                   onPointsChange={handlePointsChange}
                   players={game.players}
      />
      <DeletePlayersDialog players={game.players}
                           open={deleteOpen}
                           onDelete={deletePlayer}
                           onClose={() => setDeleteOpen(false)}
      />
      <LeaderboardDialog players={game.players}
                         open={leaderboardOpen}
                         onClose={() => setLeaderboardOpen(false)}
      />
      <NewGameDialog open={newGameOpen}
                     players={game.players}
                     onClose={() => setNewGameOpen(false)}
                     onSubmit={setNewGame}
      />
      <HistoryDialog open={historyOpen}
                     onClose={() => setHistoryOpen(false)}
                     onReturnPlaying={(game) => setOldGame(game)}
                     onDeleteGame={(id) => {deleteOldGame(id)}}
      />
    </div>
  );
}

export default App;
