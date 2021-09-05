import {useEffect, useState} from "react";
import {GameModel} from "../models/game.model";
import { v4 as uuidv4 } from 'uuid';
import localForage from 'localforage';

const gameKey = 'game';

const initialGame: GameModel = {
  id: uuidv4(),
  name: `Game ${new Date().toLocaleDateString()}`,
  timestamp: new Date(),
  players: []
};

export const useGameState = (): [GameModel, (game: GameModel) => void] => {
  const [game, setStateGame] = useState<GameModel>(initialGame);

  useEffect(() => {
      localForage
        .getItem<GameModel>(gameKey)
        .then((game) => game && setStateGame(game));
  }, []);

  const setGame = async (newGame: GameModel) => {
    setStateGame(newGame);
    await localForage.setItem(gameKey, newGame);
  }

  return [game, setGame];
}
