import {useEffect, useState} from "react";
import {GameModel} from "../models/game.model";

const gameKey = 'game';

const initialGame: GameModel = JSON.parse(
  localStorage.getItem(gameKey) || JSON.stringify({name: new Date().toLocaleString(), players: []})) as GameModel;

export const useGameState = (): [GameModel, (game: GameModel) => void] => {
  const [game, setStateGame] = useState<GameModel>(initialGame);

  const setGame = (newGame: GameModel) => {
    setStateGame(newGame);
  }

  useEffect(() => {
    const timeout = setTimeout(() => localStorage.setItem(gameKey, JSON.stringify(game)), 1000);
    return () => clearTimeout(timeout);
  });

  return [game, setGame];
}
