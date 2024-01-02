import {useState} from 'react';
import {GameModel} from '../models/game.model';
import {v4 as uuidv4} from 'uuid';

export const gameKey = 'game';

const getStoredGame = (): GameModel => {
  const storedGame = localStorage.getItem(gameKey);
  if (storedGame) {
    const parsed = JSON.parse(storedGame) as GameModel;
    return {...parsed, timestamp: new Date(parsed.timestamp)}
  } else {
    return {
      id: uuidv4(),
      commentFields: false,
      showStartingPlayer: false,
      name: 'New Game',
      timestamp: new Date(),
      players: []
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
