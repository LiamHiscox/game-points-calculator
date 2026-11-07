import {useState} from 'react';
import type {GameModel} from '../models/game.model';
import {v4 as uuidv4} from 'uuid';

export const gameKey = 'game';

const getStoredGame = (): GameModel => {
  const storedGame = localStorage.getItem(gameKey);
  if (storedGame) {
    const parsed = JSON.parse(storedGame) as GameModel;
    return {
      id: parsed.id,
      commentFields: !!parsed.commentFields,
      showStartingPlayer: !!parsed.showStartingPlayer,
      showIncrement: !!parsed.showIncrement,
      stepSize: parsed.stepSize || 1,
      name: parsed.name,
      players: parsed.players,
      timestamp: new Date(parsed.timestamp),
    }
  } else {
    return {
      id: uuidv4(),
      commentFields: false,
      showStartingPlayer: false,
      showIncrement: false,
      stepSize: 1,
      name: 'New Game',
      timestamp: new Date(),
      players: [],
    };
  }
}

export const useGameState = (): [GameModel, (game: GameModel) => void] => {
  const [game, setStateGame] = useState<GameModel>(getStoredGame);

  const setGame = (newGame: GameModel): void => {
    setStateGame(newGame);
    localStorage.setItem(gameKey, JSON.stringify(newGame));
  }

  return [game, setGame];
}
