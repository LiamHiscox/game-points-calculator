import React, {useState} from 'react';
import './App.scss';
import {Points} from "./models/player.model";
import {useGameState} from "./store/game.store";
import {DeletePlayersDialog} from "./components/delete-players-dialog/DeletePlayersDialog";
import {useSnackbar} from "notistack";
import {LeaderboardDialog} from "./components/leaderbord-dialog/LeaderboardDialog";
import { v4 as uuidv4 } from 'uuid';
import {PointsTable} from "./points-table/PointsTable";
import {TopBar} from "./top-bar/TopBar";
import {NewGameDialog} from "./components/new-game-dialog/NewGameDialog";
import {HistoryDialog} from "./components/history-dialog/HistoryDialog";
import {StatsDialog} from "./components/stats-dialog/StatsDialog";
import {useGamesState} from "./store/games.store";
import {GameModel} from "./models/game.model";
import {PwaInstallationDialog} from "./components/pwa-installation-dialog/PwaInstallationDialog";

function App() {
  const [game, setGame] = useGameState();
  const {games, deleteGame, replayGame, addGame} = useGamesState();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [newGameOpen, setNewGameOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [installationOpen, setInstallationOpen] = useState(true);
  const [showRows, setShowRows] = useState(!!localStorage.getItem('showRows'));
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

  const canSaveGame = (game: GameModel): boolean => {
    return game
      .players
      .map(player => player.points.filter(points => points !== null)).filter(points => points.length > 0)
      .length >= game.players.length;
  }

  const setNewGame = (newGame: GameModel, save: boolean = true) => {
    if (canSaveGame(game) && save) {
      addGame(game);
    }
    setGame({...newGame, id: uuidv4(), timestamp: new Date(), players: newGame.players});
    setNewGameOpen(false);
  }

  const setOldGame = (oldGame: GameModel) => {
    if (canSaveGame(game)) {
      addGame(game);
    }
    replayGame(oldGame.id);
    setGame({...oldGame, timestamp: new Date()});
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

  const clearPoints = (save: boolean) => {
    setNewGame({
      ...game,
      players: game.players.map(player => ({...player, points: [null]}))
    }, save);
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

  const handleToggleRows = () => {
    setShowRows(!showRows);
    localStorage.setItem('showRows', !showRows ? 'true': '');
  }

  return (
    <div className="app">
      <TopBar gameName={game.name}
              canSaveGame={canSaveGame(game)}
              onNameChange={setGameName}
              onAddPlayer={addPlayer}
              onClearPoints={clearPoints}
              onOpenDelete={() => setDeleteOpen(true)}
              onOpenLeaderBoard={() => setLeaderboardOpen(true)}
              onNewGame={() => setNewGameOpen(true)}
              onOpenHistory={() => setHistoryOpen(true)}
              onOpenStats={() => setStatsOpen(true)}
              showRows={showRows}
              onToggleRows={handleToggleRows}
      />
      <PointsTable onPlayerNameChange={setPlayerName}
                   onPointsChange={handlePointsChange}
                   players={game.players}
                   readonly={false}
                   showRows={showRows}
                   commentFields={game.commentFields}
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
                     game={game}
                     onClose={() => setNewGameOpen(false)}
                     onSubmit={setNewGame}
      />
      <HistoryDialog open={historyOpen}
                     onClose={() => setHistoryOpen(false)}
                     onReturnPlaying={setOldGame}
                     onDeleteGame={deleteOldGame}
                     games={games}
      />
      <StatsDialog open={statsOpen}
                   onClose={() => setStatsOpen(false)}
                   players={game.players}
      />
      <PwaInstallationDialog open={installationOpen}
                             onClose={() => setInstallationOpen(false)}
      />
    </div>
  );
}

export default App;
