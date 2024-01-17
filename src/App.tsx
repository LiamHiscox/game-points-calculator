import React, {useState} from 'react';
import './App.scss';
import {PlayerModel, PointModel} from './models/player.model';
import {useGameState} from './store/game.store';
import {DeletePlayersDialog} from './components/delete-players-dialog/DeletePlayersDialog';
import {useSnackbar} from 'notistack';
import {LeaderboardDialog} from './components/leaderbord-dialog/LeaderboardDialog';
import { v4 as uuidv4 } from 'uuid';
import {PointsTable} from './points-table/PointsTable';
import {TopBar} from './top-bar/TopBar';
import {NewGameDialog} from './components/new-game-dialog/NewGameDialog';
import {HistoryDialog} from './components/history-dialog/HistoryDialog';
import {StatsDialog} from './components/stats-dialog/StatsDialog';
import {useGamesState} from './store/games.store';
import {GameModel} from './models/game.model';
import {PwaInstallationDialog} from './components/pwa-installation-dialog/PwaInstallationDialog';
import {SortPlayersDialog} from './components/sort-players-dialog/SortPlayersDialog';
import { StartupActionsDialog } from './components/startup-actions-dialog/StartupActionsDialog';

function App(): JSX.Element {
  const [game, setGame] = useGameState();
  const {games, deleteGame, replayGame, addGame} = useGamesState();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [newGameOpen, setNewGameOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [sortPlayersOpen, setSortPlayersOpen] = useState(false);
  const [installationOpen, setInstallationOpen] = useState(true);
  const [startupActionsOpen, setStartupActionsOpen] = useState(true);
  const [showRows, setShowRows] = useState(!!localStorage.getItem('showRows'));
  const {enqueueSnackbar} = useSnackbar();

  if (game.players.length === 0) {
    setGame({
      ...game,
      players: [{id: uuidv4(), name: 'Player 1', points: [{}]}]
    });
  }

  const setGameName = (name: string): void => {
    setGame({...game, name})
  }

  const canSaveGame = (game: GameModel): boolean => {
    return game
      .players
      .map(player => player.points.filter(points => typeof points.points === 'number'))
      .filter(points => points.length > 0)
      .length >= game.players.length;
  }

  const setNewGame = (newGame: GameModel, save = true): void => {
    if (canSaveGame(game) && save) {
      addGame(game);
    }
    setGame({...newGame, id: uuidv4(), timestamp: new Date(), players: newGame.players});
    setNewGameOpen(false);
  }

  const setOldGame = (oldGame: GameModel): void => {
    if (canSaveGame(game)) {
      addGame(game);
    }
    replayGame(oldGame.id);
    setGame({...oldGame, timestamp: new Date()});
    setHistoryOpen(false);
  }

  const deleteOldGame = (id: string): void => {
    deleteGame(id);
    setHistoryOpen(false);
  }

  const handlePointsChange = (points: PointModel[], id: string): void => {
    setGame({
      ...game,
      players: game.players.map(player => player.id === id ? {...player, points} : player)
    });
  }

  const addPlayer = (): void => {
    setGame({
      ...game,
      players: game.players.concat({id: uuidv4(), name: `Player ${game.players.length + 1}`, points: [{}]})
    });
    enqueueSnackbar(`${game.players.length + 1} players`);
  }

  const clearPoints = (save: boolean): void => {
    setNewGame({
      ...game,
      players: game.players.map(player => ({...player, points: [{}]}))
    }, save);
  }

  const setPlayerName = (name: string, id: string): void => {
    setGame({
      ...game,
      players: game.players.map(player => player.id === id ? {...player, name} : player)
    });
  }

  const deletePlayer = (id: string): void => {
    setGame({
      ...game,
      players: game.players.filter(player => player.id !== id)
    });
  }

  const handleToggleRows = (): void => {
    setShowRows(!showRows);
    localStorage.setItem('showRows', !showRows ? 'true': '');
  }

  const toggleCommentField = (): void => {
    setGame({
      ...game,
      commentFields: !game.commentFields
    });
  }

  const toggleShowStartingPlayer = (): void => {
    setGame({
      ...game,
      showStartingPlayer: !game.showStartingPlayer
    });
  }

  const changePlayerSort = (players: PlayerModel[]): void => {
    setSortPlayersOpen(false);
    setGame({...game, players});
  }

  const onStartNewGame = (): void => {
    setStartupActionsOpen(false);
    setNewGameOpen(true);
  }

  return (
    <div className="app">
      <TopBar commentField={game.commentFields}
              showStartingPlayer={game.showStartingPlayer}
              gameName={game.name}
              canSaveGame={canSaveGame(game)}
              onNameChange={setGameName}
              onAddPlayer={addPlayer}
              onClearPoints={clearPoints}
              onOpenDelete={(): void => setDeleteOpen(true)}
              onOpenLeaderBoard={(): void => setLeaderboardOpen(true)}
              onNewGame={(): void => setNewGameOpen(true)}
              onOpenHistory={(): void => setHistoryOpen(true)}
              onOpenStats={(): void => setStatsOpen(true)}
              showRows={showRows}
              onToggleRows={handleToggleRows}
              onToggleCommentField={toggleCommentField}
              onToggleShowStartingPlayer={toggleShowStartingPlayer}
              onSortPlayers={(): void => setSortPlayersOpen(true)}
      />
      <PointsTable onPlayerNameChange={setPlayerName}
                   onPointsChange={handlePointsChange}
                   showStartingPlayer={game.showStartingPlayer}
                   players={game.players}
                   readonly={false}
                   showRows={showRows}
                   commentFields={game.commentFields}
      />
      <DeletePlayersDialog players={game.players}
                           open={deleteOpen}
                           onDelete={deletePlayer}
                           onClose={(): void => setDeleteOpen(false)}
      />
      <LeaderboardDialog players={game.players}
                         open={leaderboardOpen}
                         onClose={(): void => setLeaderboardOpen(false)}
      />
      <NewGameDialog open={newGameOpen}
                     game={game}
                     onClose={(): void => setNewGameOpen(false)}
                     onSubmit={setNewGame}
      />
      <HistoryDialog open={historyOpen}
                     onClose={(): void => setHistoryOpen(false)}
                     onReturnPlaying={setOldGame}
                     onDeleteGame={deleteOldGame}
                     games={games}
      />
      <StatsDialog open={statsOpen}
                   onClose={(): void => setStatsOpen(false)}
                   players={game.players}
      />
      <SortPlayersDialog open={sortPlayersOpen}
                         onClose={(): void => setSortPlayersOpen(false)}
                         onSubmit={changePlayerSort}
                         players={game.players}
      />
      <StartupActionsDialog open={startupActionsOpen}
                            onCancel={(): void => setStartupActionsOpen(false)}
                            onStartNewGame={onStartNewGame}
      />
      <PwaInstallationDialog open={installationOpen}
                             onClose={(): void => setInstallationOpen(false)}
      />
      <div className="keyboard-placeholder"/>
    </div>
  );
}

export default App;
